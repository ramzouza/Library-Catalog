const MySql = require('sync-mysql')
const User = require('./User')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class ResourceMapper {
    static insert(resource_data) {

    }

    static delete(resource_data) {

    }

    static update(resource_data) {

    }
}