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



    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports=UserMapper;


