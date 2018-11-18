const pre = require("../contractModule/pre.js");
const ensure = require("../contractModule/ensure.js");
const MySql = require('sync-mysql');
const UserCatalog = require("../Users/UserCatalog.js");
const ResourceCatalog = require("./ResourceCatalog.js");

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class TransactionLogger {


    static log(user_id, resource_id, transaction_type, date){
        try {
            console.log(arguments);
            pre(
                {
                    "title": "User with id of user_id is a client.",
                    "expression": UserCatalog.GetUserById(user_id).results.isAdmin === 0,
                },
                {
                    "title": "Resource with id of resource_id is already in the database.",
                    "expression": ResourceCatalog.GetResourceById(resource_id).status === 0
                },
                {
                    "title": "Transaction type is either equal to 'loan' or 'return'.",
                    "expression": transaction_type === "loan" || transaction_type === "return"
                }
            )
            
            console.log(`INSERT INTO transactions (user_id, resource_id, transaction_type, timestamp) VALUES (${user_id}, ${resource_id}, "${transaction_type}", "${date}")`)
            const data = connection.query(`INSERT INTO transactions (user_id, resource_id, transaction_type, timestamp) VALUES (${user_id}, ${resource_id}, "${transaction_type}", "${date}")`);
            console.log(data);
            ensure(
                {
                    "title": "Transaction Log exists in database.",
                    "expression": data.affectedRows === 1,
                }
            )
        return {"status":1, "message":"Ok", "results": data.insertId}
        } catch (e){
            return {"status":1, "message": e}
        }
    }


    static getLogs(){
        return connection.query(`SELECT * FROM transactions`);
    }


}

module.exports = TransactionLogger;