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
                    console.log(resource_type);
                    console.log(`SELECT * FROM ${resource_type} where resource_id= '${resource_id}'`)
                    const query = connection.query(`SELECT * FROM ${resource_type} where resource_id= '${resource_id}'`)
                    const child_data = query[0];
                    child_data.title = resource_data[0].title;

                    console.log(child_data)
                    
                    switch(resource_type){
                        case "book":
                            resource = new Book(child_data,resource_id);
                            break;
                        case "magazine":
                            resource = new Magazine(child_data,resource_id);
                            break;      
                        case "movie":
                            resource = new Movie(child_data,resource_id);
                            console.log(resource);
                            break;        
                        case "music":
                            resource = new Music(child_data,resource_id);
                            break;
                    }
                    resource.resource_type = resource_type;
                    IdentifyMap[resource_id] = resource;
                }
                return {status: 0, message: 'Ok', results: resource};
            } catch (error){
                return{ status: 1, message: 'Error: ' + error, error}
            }

        }
 
    }


    static selectAll(){
        try{

            let resources = [];
            let resource = {};

            const book_data = connection.query(`select 
            r.title,
            r.id,
            b.author,
            b.format,
            b.pages,
            b.publisher,
            b.language,
            b.isbn_10,
            b.isbn_13,
            b.resource_id,
            b.id 
            from resource as r
            left join book as b on r.id=b.resource_id
            where type='book'
            `);
            const music_data = connection.query(`select 
            r.title,
            r.id,
            mu.type,
            mu.artist,
            mu.release,
            mu.ASIN,
            mu.label,
            mu.resource_id,
            mu.id 
            from resource as r
            left join music as mu on r.id=mu.resource_id
            where r.type='music'
            `);
            const movie_data = connection.query(`
            select 
            r.title,
            r.id,
            mo.director,
            mo.producers,
            mo.actors,
            mo.language,
            mo.subtitles,
            mo.dubbed,
            mo.release_date,
            mo.run_time,
            mo.resource_id,
            mo.id 
            from resource as r
            left join movie as mo on r.id=mo.resource_id
            where r.type='movie'
            `);
            const magazine_data = connection.query(`
            select 
            r.title,
            r.id,
            ma.publisher,
            ma.language,
            ma.isbn_10,
            ma.isbn_13,
            ma.resource_id,
            ma.id 
            from resource as r
            left join magazine as ma on r.id=ma.resource_id
            where r.type='magazine'
            `);
            for (let i=0; i<book_data.length;i++){
                resource = book_data[i]
                resource.resource_data = 'book';
                resources.push( {"type": 'book', "resource_data": resource  } );
            }
            for (let i=0; i<magazine_data.length;i++){
                resource = magazine_data[i]
                resource.resource_data = 'magazine';
                resources.push( {"type": 'magazine', "resource_data": resource  } );
            }
            for (let i=0; i<music_data.length;i++){
                resource = music_data[i]
                resource.resource_data = 'music';
                resources.push( {"type": 'music', "resource_data": resource  } );
            }
            for (let i=0; i<movie_data.length;i++){
                resource = movie_data[i]
                resource.resource_data = 'movie';
                resources.push( {"type": 'movie', "resource_data": resource  } );
            }

            return {status: 0, message: 'Ok', results: resources};
        } catch (error){
            return{ status: 1, message: 'Error: ' + error, error}
        }
    }



    // Method to insert resource into resources table 
    static insert(resource_obj, type) {
        
        try{
            type = type.toLowerCase();
            const parent_obj = {"type":type, "title": resource_obj.title, "id":0}; // parent resource obj fits this schema
            delete resource_obj.id; // make it fit for the child table 
            delete resource_obj.title; // make it fit for the child table
            const parent_data = connection.query(`INSERT INTO resource VALUES( ${this.objectToQueryString(parent_obj)} )`); // Insert resource data (parent)
            resource_obj.resource_id = parent_data.insertId; // with the insert id of the resource table, reference the fk of the child data to the pk of the parent
            resource_obj.id = 0;
            connection.query(`INSERT INTO ${type} VALUES (${this.objectToQueryString(resource_obj)})`); // Insert into the child table the child data (book, magazine, music, movie)
            const resource_line_item = {"id":0, "resource_id": parent_data.insertId, "user_id": null, "date_due": "Never"}; // declare schema for the line item instance (this table represents the number of instances)
            connection.query(`INSERT INTO resource_line_item (id, resource_id, user_id, date_due) VALUES(0, ${resource_line_item.resource_id}, NULL, '${resource_line_item.date_due}')`); 
            const resource = this.select(parent_data.insertId).results
            return {status: 0, message: 'Resource Added', results: resource};
        }
        catch(error){
            return{ status: 1, message: 'Error' +error, error}
        }
    }

    // This method will make a sql call to delete an entire resource record once called
    static delete(id) {
        try{
            delete IdentifyMap[id];
            const data = connection.query(`SELECT * FROM resource where id=${id}`);
            if (data.length > 0){
                const type = data[0].type;
                const resource_line_item_data = connection.query(`DELETE FROM resource_line_item WHERE resource_id=${id}`);
                const child_data = connection.query(`DELETE FROM ${type} where resource_id=${id}`);
                const resource_data = connection.query(`DELETE FROM resource where id=${id}`);
                return {status : 0, message : 'Resource deleted.'};
            } else {
                return {status : 1, message : 'Nothing to delete.'}
            }
        }
        catch(error){
            return {status : 1, message : 'Error' +error, error}
        }
    }

    // Method to update relevant resource given the new information
    static update(resource_obj, type) {
        try {
            type = type.toLowerCase();
            connection.query(`UPDATE resource SET title = '${resource_obj.title}' WHERE id='${resource_obj.id}'`);
            const id = resource_obj.id;
            delete resource_obj.id;
            delete resource_obj.title;
            const data = connection.query(`UPDATE ${type} SET ${this.objectToUpdateString(resource_obj)} WHERE resource_id='${id}'`);
            return {status : 0, message : 'Resource updated.', results : data}
        }
        catch(error) {
            return {status : 1, message : 'Error' +error, error}
        }
    }
    //Get all authors for advanced search
    static getAllAuthors(){
        try{
          
            const data = connection.query(`SELECT DISTINCT author from book`);
            
            return {status: 0, message: 'Ok', results: data};
        } catch (error){
            return{ status: 1, message: 'Error: ' + error, error}
        }
}

    //Get all authors for advanced search
    static getAllDirectors(){
     try{

        const data = connection.query(`SELECT DISTINCT director from movie`);
       
        return {status: 0, message: 'Ok', results: data};
     } catch (error){
        return{ status: 1, message: 'Error: ' + error, error}
    }
    }

    //Get all publishers for advanced search
    static getAllPublishers(){
        try{
   
           const data = connection.query(`select distinct publisher from magazine`);
          
           return {status: 0, message: 'Ok', results: data};
        } catch (error){
           return{ status: 1, message: 'Error: ' + error, error}
       }
       }

       //Get all artists for advanced search
    static getAllArtists(){
        try{
   
           const data = connection.query(`select distinct artist from music`);
          
           return {status: 0, message: 'Ok', results: data};
        } catch (error){
           return{ status: 1, message: 'Error: ' + error, error}
       }
       }

    // Helper. This method turns an object into a string formated for an SQL query
    static objectToQueryString(object) { 
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }

    static objectToUpdateString(object) { 
        return Object.keys(object).map(key => key + "='" + object[key] + "'").join(' , ')
    }
}

module.exports = ResourceMapper;