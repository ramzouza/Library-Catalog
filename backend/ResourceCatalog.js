const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book');
const Movie = require('./Movie');
const Magazine = require('./Magazine');
const Music = require('./Music');


var key = 0;
var ResourceList = [];

class ResourceCatalog {

    static getkey(){
        return key++;
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
    resource.id = ResourceCatalog.getkey()
    resource.type = type
    const found = this.find(resource.id)
    
    if(found){
        return { status: 0, message: "An existing resource got an extra instance", results: resource}
    }
    this.add(resource)
    return {status: 0, message: "Saved resource", results: resource }
    
  }

  static add(resource){
    ResourceList.push(resource)
  }
  
  static find(id) {
      return ResourceList.find( x => x.id === id)
  }

  static delete(id){
      ResourceList = ResourceList.filter( x => x.id != id)
  }
  static GetAllResources(){
      return ResourceList;
  }

  static EditResource(id,title){
    if(ResourceList[id]!=undefined || ResourceList!=null){
            ResourceList[id].title = title;
    return { status: 0, message: "Resource was Updated"}
    }
    else
    return { status: 1, message: "Resource was not found"}
  }

  static logCurrentState(){
      console.log("===========");
      console.log(ResourceList);
      console.log("===========");
  }

  static DeleteResource(resource_id){
    if(ResourceList[resource_id]){
        this.delete(resource_id)
        this.logCurrentState();
        return { status: 0, message: "Resource was deleted", results: resource_id}
    } else {
        return { status: 1, message: "Resource not found/deleted"}
    }
  }

}

module.exports = ResourceCatalog 