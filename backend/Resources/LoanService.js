const pre = require('../contractModule/pre.js');
const ensure = require('../contractModule/ensure.js');
const inv = require('../contractModule/inv.js');
const TransactionLogger = require('./TransactionLogger.js');

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})


class LoanService {

    static loanItem(userId,item){ // item is a an array of resource_line_item ids

        pre(
            {
                "title": "",
                "expression": true // user must be a client
            },
            {
                "title": "",
                "expression": true // resource must be available meaning user id is Null
            },
            {
                "title": "",
                "expression": true // resource is a loanable item
            },
            {
                "title": "",
                "expression": true // no more than 10 resources
            }
        )


        const alreadyloan = connection.query("SELECT COUNT(*) as count FROM resource_line_item where user_id ='"+userId+"'");
        
        if(item.length > (10-alreadyloan[0]['count'])){
        return { status: 1, message: 'extra', info:alreadyloan[0]['count']}
        }
        else{
            let alreadyLoanItem = [];

            for(let x=0;x<item.length;x++){

                const getType = connection.query("SELECT type FROM resource_line_item LEFT JOIN resource ON resource_line_item .resource_id=resource .id where resource_line_item.id ="+item[x]+" ")
                let date = new Date();
                if(getType[0]['type'] == "movie" || getType[0]['type'] == "music"){
                    date.setDate(date.getDate() + 2);
                }else{
                    date.setDate(date.getDate() + 7);
                }
                const alreadyloan = connection.query("UPDATE resource_line_item SET user_id = '"+userId+"', date_due ='"+date+"' WHERE id = '"+item[x]+"' and user_id is NULL");
                alreadyLoanItem.push({loan:alreadyloan['changedRows'],itemid:item[x]})
            }
            return { status: 0, message: 'loan', info: alreadyLoanItem}
        }

        ensure(
            {
                "title": "",
                "expression": true // user must be a client
            }
        )
    }

    static returnItem(itemId){
        const alreadyloan = connection.query("UPDATE resource_line_item SET user_id = NULL, date_due ='Never' WHERE id = "+itemId);
        if(alreadyloan['changedRows']==0)
            return { status: 1}
        return { status: 0}
    }

}

module.exports = ResourceMapper;