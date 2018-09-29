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
    static MakeNewUser(user, handler){
        
        this.GetUser(user.email, ({status,results})=>{
            if(status == 1 || results.length == 0){
                connection.query(`INSERT INTO users SET ?`, user , function (error, results) {
                    if (error) 
                        handler({status:1 ,error});
                    else
                        handler({status: 0, results: results});
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

    static SetIsActive(email,isActive, handler){
        connection.query(`UPDATE users
                            SET isActive = ${isActive}
                            WHERE email = '${email}'`, function (error, results) {
            if (error) handler({status:1 ,error});
            else{
                handler({status: 0, results: results });
            }
        })
    }
}

module.exports = UserCatalog;