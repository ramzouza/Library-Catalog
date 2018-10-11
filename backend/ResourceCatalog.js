const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book');

var key = 0;
var ResourceList = [];

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
                resource = new Magazine(resourceData, id=-1, instances=1);
                break;      
            case "Movie":
                resource = new Movie(resourceData, id=-1, instances=1);
                break;        
            case "Music":
                resource = new Music(resourceData, id=-1, instances=1);
                break;          
    }
    resource.id = ResourceCatalog.getkey();
    ResourceList[resource.id] = resource
    if(ResourceList[resource.id]){
        return { status: 0, message: "An existing resource got an extra instance"}
    }
    
    return {status: 0, message: "Saved resource", results: resource }
    
  }

  static DeleteResource(resource_id){
    if(ResourceList[resourceId]){
        ResourceList[resourceId] = undefined;
        return { status: 0, message: "Resource was deleted", results: resourceId}
    } else {
        return { status: 1, message: "Resource not found/deleted"}
    }
  }

}

module.exports = ResourceCatalog 