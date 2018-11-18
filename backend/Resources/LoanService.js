const pre = require('../contractModule/pre.js');
const ensure = require('../contractModule/ensure.js');
const inv = require('../contractModule/inv.js');
const TransactionLogger = require('./TransactionLogger.js');
const MySql = require('sync-mysql')
const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})


class LoanService {

    static loan(userId,item){
        let alreadyLoanItem = [];
        for(let x=0;x<item.length;x++){
            try{
                const getType = connection.query("SELECT type FROM resource_line_item LEFT JOIN resource ON resource_line_item .resource_id=resource .id where resource_line_item.id ="+item[x]+" ")
                const availability = connection.query("UPDATE resource_line_item SET semaphore = 1 WHERE id = '"+item[x]+"' and user_id is NULL and semaphore = 0");

                item
                pre(
                {
                    "title": "The resource must be available",
                    "expression": availability['changedRows'] == 1 // resource is a loanable item
                },
                {
                    "title": "Resource must be Loanable",
                    "expression": getType[0]['type'] != "magazine" // no more than 10 resources
                }
            )

                let date = new Date();
                if(getType[0]['type'] == "movie" || getType[0]['type'] == "music"){
                    date.setDate(date.getDate() + 2);
                }else{
                    date.setDate(date.getDate() + 7);
                }
                const alreadyloan = connection.query("UPDATE resource_line_item SET user_id = '"+userId+"', date_due ='"+date+"', semaphore = 0 WHERE id = '"+item[x]+"' and user_id is NULL");
                alreadyLoanItem.push({loan:1,itemid:item[x]})


            ensure(
                {
                    "title": "The resource is loaned and no longer available",
                    "expression": alreadyloan['changedRows'] == 1 // user must be a client
                }
            )


        }catch(e){
           connection.query("UPDATE resource_line_item SET semaphore = 0 WHERE id = '"+item[x]+"' and user_id is NULL ");
           alreadyLoanItem.push({loan:0,itemid:item[x]})
            }
    }
    return { status: 0, message: 'loan', info: alreadyLoanItem}
    }

    static loanItem(userId,item,isClient){ // item is a an array of resource_line_item ids
        const alreadyloan = connection.query("SELECT COUNT(*) as count FROM resource_line_item where user_id ='"+userId+"'");
        try{
        pre(
            {
                "title": "User must be a client",
                "expression": isClient // user must be a client
            },
            {
                "title": "User must have loaned less than 10 resources",
                "expression": item.length <= (10-alreadyloan[0]['count']) // resource must be available meaning user id is Null
            }
        )
        return this.loan(userId,item)

    }catch(e){
        return { status: 1, message: 'extra', info:alreadyloan[0]['count']}
        }
    }

    static returnItem(isAdmin,itemId){
        console.log({itemId})
        try{
            const isloaned = connection.query("select user_id from resource_line_item  WHERE id = "+itemId);

        pre({
            "title": "User must be an admin",
            "expression": isAdmin // user must be an admin
        },
        {
            "title": "The resource must be loaned",
            "expression": isloaned[0]['user_id'] != null // resource must be loaned meaning user id is not null
        })
        let update = connection.query("UPDATE resource_line_item SET user_id = NULL, date_due ='Never' WHERE id = "+itemId);

        ensure(
            {
                "title": "The resource is available and no longer loaned",
                "expression": update['changedRows'] == 1 // user must be a client
            }
        )
        return { status: 0}
    }catch(e){
        return { status: 1}
    }
}

}

module.exports = LoanService;
