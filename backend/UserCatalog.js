const MySql = require('sync-mysql')
const User = require('./User')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class UserCatalog {
    static MakeNewUser(user_data) { // Sync
        user_data.id = 0; // For query
        const user = new User(user_data);
        const { results, error }  = this.GetUserByEmail(user.email);
        if (results.length != 0) // Array is not empty
            return { status: 1, message: 'User exists already', error }
        try {
            const data = connection.query(`INSERT INTO users VALUES (${this.objectToQueryString(user)})`)
            return { status: 0, message: 'Ok', results: data }
        } catch (error) {
            return { status: 1, message: 'Error'+error, error }
        }
    }

    static GetUserByEmail(email) { // Sync
        try {
            const data = connection.query(`SELECT * FROM users where email='${email}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error }
        }
    }

    static GetUserById(id) { // Sync
        try {
            const data = connection.query(`SELECT * FROM users where id='${id}'`)
            return { status: 0, message: "User found.", results: data }
        } catch (error) {
            return { status: 1, message : "Error...", error }
        }
    }

    static DeleteUserById(id) {
        try {
            const data = connection.query(`DELETE FROM users where id=${id}`);
            return { status: 0, message: "User Deleted.", results: data}
        } catch(error){
            return {status: 1, message: "Error...", error};
        }
    }

    static ViewLoggedInUsers() { // Sync
        try {
            const data = connection.query(`SELECT * FROM users where isActive=1`)
            const usersArray = data.map(user => { return { user: user.email, isAdmin: user.isAdmin ? 'Admin' : 'Client' } })

            return { status: 0, results: data,users: usersArray }
        } catch (error) {
            return { status: 1, error }
        }
    }


    static SetIsActive(id, isActive) { // Sync
        try{
            const data = connection.query(`UPDATE users SET isActive=${isActive} WHERE id='${id}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error}
        }
    }

    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports = UserCatalog;
