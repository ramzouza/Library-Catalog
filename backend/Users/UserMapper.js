const MySql = require('sync-mysql')
const User = require('./User')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class UserMapper{
    static PersistUser(user){
        try {
            const data = connection.query(`INSERT INTO users VALUES (${this.objectToQueryString(user)})`)
            return { status: 0, message: 'Ok', results: data }
        } catch (error) {
            return { status: 1, message: 'Error'+error, error }
        }
    }

    static RetrieveUserByEmail(email){
        try {
            const data = connection.query(
                `SELECT * FROM users WHERE email='${email}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error }
        }
    }

    static RetrieveUserById(id){
        try {
            const data = connection.query(`SELECT * FROM users where id='${id}'`)
            if (data.length > 0){
                return { status: 0, message: "User found.", results: data[0]}
            } else {
                throw "User not found."
            }
        } catch (error) {
            console.log("error =>",error)
            return { status: 1, message : error, error }
        }
    }

    static DeleteUser(id){
        try {
            const data = connection.query(`DELETE FROM users where id=${id}`);
            return { status: 0, message: "User Deleted.", results: data}
        } catch(error){
            return {status: 1, message: "Error...", error};
        }
    }

    static ActiveUsers(){
        try {
            const data = connection.query(`SELECT * FROM users where isActive=1`)
            const usersArray = data.map(user => { return { user: user, isAdmin: user.isAdmin ? 'Admin' : 'Client' } })

            return { status: 0, results: data,users: usersArray }
        } catch (error) {
            return { status: 1, error }
        }
    }

    static SetActive(id,isActive){
        try{
            let last_login;
            if (isActive){
                last_login = "now()";
            } else {
                last_login = null;
            }
            console.log(last_login)

            const data = connection.query(`UPDATE users SET isActive=${isActive}, last_login=${last_login}  WHERE id='${id}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error}
        }
    }



    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports=UserMapper;


