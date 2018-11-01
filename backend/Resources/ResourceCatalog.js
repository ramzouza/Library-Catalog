const objectToQueryString = require("../Users/UserCatalog").objectToQueryString
const Book = require('./Book.js');
const Movie = require('./Movie.js');
const Magazine = require('./Magazine.js');
const Music = require('./Music.js');
const ResourceMapper = require('./ResourceMapper');

class ResourceCatalog {


    static MakeNewResource(resourceData, type){
        return ResourceMapper.insert(resourceData, type);
    }

    static Find(id) {
      return ResourceMappter.select(id);
    }

    static GetAllResources(){
      return ResourceMapper.selectAll();
    }

    static EditResource(resource_id, resourceData, type){
        resourceData.id = resource_id;
        return ResourceMapper.update(resourceData, type);
    } 
    
    static DeleteResource(id){
        return ResourceMapper.delete(id);
    }

}

module.exports = ResourceCatalog 