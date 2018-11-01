const IdentifyMap = require("../IdentityMap.js");
const Book = require('./Book');
const Movie = require('./Movie');
const Magazine = require('./Magazine');
const Music = require('./Music');
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


    static select(id){
        try {
            resource = IdentifyMap[id];
            return resource;
        } catch (e) {
            try{
                let resource = {};
                const resource_data = connection.query(`SELECT * FROM resource where id= '${id}'`);
                if (resource_data.length > 0){
                    const resource_id = resource_data[0].id;
                    const resource_type = resource_data[0].type;

                    const child_data = connection.query(`SELECT * FROM ${resource_type} where resource_id= '${resource_id}'`)[0];
                    child_data['title'] = resource_data[0].title;

                    switch(resource_type){
                        case "book":
                            resource = new Book(child_data,resource_id);
                            break;
                        case "magazine":
                            resource = new Magazine(child_data,resource_id);
                            break;      
                        case "movie":
                            resource = new Movie(child_data,resource_id);
                            break;        
                        case "music":
                            resource = new Music(child_data,resource_id);
                            break;
                    }
                    IdentifyMap[resource_id] = resource;
                }
                return {status: 0, message: 'Ok', results: resource};
            } catch (error){
                return{ status: 1, message: 'Error' +error, error}
            }

        }
 
    }
    // Method to insert resource into resources table
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

    // Helper. This method turns an object into a string formated for an SQL query
    static objectToQueryString(object) { 
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports = ResourceMapper;