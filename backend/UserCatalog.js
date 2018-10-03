const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '18.221.83.136',
  user     : 'root',
  password : 'ribalestbeau',
  database : 'mysql',
});
 
connection.connect();

// ` CREATE TABLE users (password_hash VARCHAR(20), isActive INT, firstName VARCHAR(20), lastName VARCHAR(20), physicalAddress VARCHAR(20), email VARCHAR(20), phoneNumber VARCHAR(20), isAdmin INT);`
// `UPDATE mytable
    // SET isActive = ${isActive},
    // WHERE email = ${email};`

class UserCatalog {

    static MakeNewUser(user, hash_function, handler){
        user.password_hash = hash_function(user.password);
        delete user.password
        this.GetUser(user.email, ({status,results})=>{
            if(status == 1 || results.length == 0){
                connection.query(`INSERT INTO users SET ?`, {id:0,...user} , function (error, results) {
                    if (error) 
                        handler({status:1, message:'User could not be added. ' + error, error});
                    else {
                        handler({status: 0, message:'User Added.', results: results});
                    }
                       
            })
            } else 
                handler({status: 1, message:'User exists already'})
        })  
    }

    static GetUser(email, handler){
        connection.query(`SELECT * FROM users where email='${email}'`, function (error, results) {
            if (error) handler({status:1 ,error});
            handler({status: 0, results: results});
        })
    }

    static GetUserById(id, handler){ // all good, i gotta go live. Ill make a branch and push to it live. You can continue working through here if you like or on that branch wtv
        connection.query(`SELECT * FROM users where id='${id}'`, function (error, results) {
            if (error) handler({status:1 ,error});
            handler({status: 0, results: results});
        })
    }

    static ViewLoggedInUsers(handler){
        connection.query(`SELECT * FROM users where isActive=1`, function (error, results) {
            if (error) handler({status:1 ,error});
            else{
                const usersArray = results.map(user => {
                    return {user: user.email, isAdmin: user.isAdmin? 'Admin' : 'Client'}
                })
                handler({status: 0, users: usersArray });
            }
        })
    }

    
    static UpdateUser(id, user, hash_function, handler){
        user.password_hash = hash_function(user.password);
        delete user.password
        connection.query(`UPDATE users SET ? WHERE id='${id}'`, {...user} , function (error, results) {
            if (error) handler({status:1, error});
            else {
                handler({status: 0, results: results});
            }
        })
    }

    
    static DeleteUser(id, handler){
        connection.query(`DELETE FROM users WHERE id='${id}'`, function (error, results) {
            if (error) handler({status:1, error});
            else {
                handler({status: 0, results: results});
            }
        })
    }

    static SetIsActive(id, isActive, handler){
        connection.query(`UPDATE users SET isActive=${isActive} WHERE id='${id}'`, function (error, results) {
            if (error) handler({status:1 ,error});
            else{
                handler({status: 0, results: results });
            }
        })
    }
}

module.exports = UserCatalog;