const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book');
const Movie = require('./Movie');
const Magazine = require('./Magazine');
const Music = require('./Music');


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
    ResourceList[resource.id] = resource
    if(ResourceList[resource.id]){
        return { status: 0, message: "An existing resource got an extra instance", results: resource}
    }
    
    return {status: 0, message: "Saved resource", results: resource }
    
  }

  static GetAllResources(){
      return ResourceList;
  }

  static EditResource(resource_id,resource_data){
    if(ResourceList[resource_id]!=undefined || ResourceList!=null){
            ResourceList[resource_id].Title = resource_data.Title;
                
    return { status: 0, message: "Resource was Updated"}
    }
    else
    return { status: 1, message: "Resource was not found"}
  }

  static DeleteResource(resource_id){
    if(ResourceList[resource_id]){
        ResourceList[resource_id] = undefined;
        return { status: 0, message: "Resource was deleted", results: resource_id}
    } else {
        return { status: 1, message: "Resource not found/deleted"}
    }
  }

}

module.exports = ResourceCatalog 