const objectToQueryString = require("../Users/UserCatalog").objectToQueryString
const Book = require('./Book.js');
const Movie = require('./Movie.js');
const Magazine = require('./Magazine.js');
const Music = require('./Music.js');
const ResourceMappter = require('./ResourceMapper');


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
        this.add(resourceData, type)
        return {status: 0, message: "Saved resource", results: resourceData }  
  }

  static add(resource, type){
    ResourceMappter.insert(resource, type)
  }
  
  
  static find(id) {
      ResourceMappter.select(id)
   //   return ResourceList.find( x => x.id === id)
  }

  static delete(id){
      ResourceMapper.select(id)
    //  ResourceList = ResourceList.filter( x => x.id != id)
  }

  static GetAllResources(){
      return ResourceList;
  }

  /*static EditResource(id,title){
    if(ResourceList[id]!=undefined || ResourceList!=null){
            ResourceList[id].title = title;
    return { status: 0, message: "Resource was Updated"}
    }
    else
    return { status: 1, message: "Resource was not found"}
  } */

  static logCurrentState(){
      console.log("===========");
      console.log(ResourceList);
      console.log("===========");
  }
/*
  static DeleteResource(resource_id){
    if(ResourceList[resource_id]){
        this.delete(resource_id)
        this.logCurrentState();
        return { status: 0, message: "Resource was deleted", results: resource_id}
    } else {
        return { status: 1, message: "Resource not found/deleted"}
    }
  }
*/
}

module.exports = ResourceCatalog 