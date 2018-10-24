const MySql = require('sync-mysql')
const Resource = require('./Resource')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class ResourceMapper {
    static insert(resource_data) {
        resource_data.id = 0; // For query
        const res = new Resource(resource_data);
        const found = this.find(res.id);

        if(found){
            try{
            const data = connection.query(`UPDATE resources SET instances = 1 + instances WHERE id = '${resource_data.id}'`)
            return {status: 0, message: 'Ok', results: data}
            }
            catch (error){
                return{ status: 1, message: 'Error' +error, error}
            }
        }
        else {
            try{
            const data2 = connection.query(`INSERT INTO resources VALUES (${this.objectToQueryString(res)})`)
            return {status: 0, message: 'Ok', results: data2}
            }
            catch(error){
                return{ status: 1, message: 'Error' +error, error}
            }
        }
    }

    static delete(resource_data) {

    }

    static update(resource_data) {

    }
}