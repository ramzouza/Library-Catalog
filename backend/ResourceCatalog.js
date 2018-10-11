const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book');

var key = 0;
let ResourceList = [];

class ResourceCatalog {

    static getkey(){
        key++
        return key;
    }
    static getResList(){
        return ResourceList;
    }
 
  static MakeNewResource(resourceData, type){
   let resource = null;
    switch(type){
        case "Book":
            resource = new Book(resourceData);
            break;
        case "Magazine":
             resource = new Magazine(resourceData);
             break;      
        case "Movie":
             resource = new Movie(resourceData);
             break;        
        case "Music":
            resource = new Music(resourceData);
            break;          
    }
    resource.id = ResourceCatalog.getkey();
    console.log("this is the id ", resource.id) 
    ResourceList[resource.id] = resource
    if(ResourceList[resource.id]){
        return { status: 0, message: "An existing resource got an extra instance"}
    }
    
    return {status: 0, message: "Saved resource", results: resource }
    
  }

}



module.exports = ResourceCatalog 