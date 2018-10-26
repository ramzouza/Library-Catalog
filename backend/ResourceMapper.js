const MySql = require('sync-mysql')
const Resource = require('./Resource')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

// ResourceMapper class that will make calls to the database whenever a resource needs to be added, updated or deleted
class ResourceMapper {

    //Method to insert resource into resources table
    static insert(resource_data) {
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

    // This method will make a sql call to delete an entire resource record once called
    static delete(resource_data) {
        try{
            const data = connection.query(`DELETE FROM resources where id=${resource_data.id}`);
            return {status : 0, message : 'Resource deleted.', results : data}
        }
        catch(error){
            return {status : 1, message : 'Error' +error, error}
        }

    }

    // Method to update relevant resource given the new information
    static update(resource_data) {
        try {
            const data = connection.query(`UPDATE resources SET instances = '${resource_data.instances}', title = '${resource_data.title}' WHERE id='${resource_data.id}'`);
            return {status : 0, message : 'Resource updated.', results : data}
        }
        catch(error) {
            return {status : 1, message : 'Error' +error, error}
        }
    }

    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}