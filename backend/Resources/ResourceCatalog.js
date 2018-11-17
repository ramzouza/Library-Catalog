const objectToQueryString = require("../Users/UserCatalog").objectToQueryString
const Book = require('./Book.js');
const Movie = require('./Movie.js');
const Magazine = require('./Magazine.js');
const Music = require('./Music.js');
const ResourceMapper = require('./ResourceMapper');
const UnitOfWork = require('./UnitOfWork');

class ResourceCatalog {
    // A searchFilter contains a field type, and any of the attributes associated
    // with all possible resources.
    // title

    static MakeNewResource(resourceData, type){
        //return ResourceMapper.insert(resourceData, type);
        return UnitOfWork.InsertResource(resourceData, type)
        
    }

    static addLineItem(resource_id){
        return ResourceMapper.addLineItem(resource_id);
    }

    static deleteLineItem(resource_line_item_id){
        return ResourceMapper.deleteLineItem(resource_line_item_id);
    }

    static GetResourceById(id) {
      return ResourceMapper.select(id);
    }

    static Find(search,isadvancedSearch){
        return ResourceMapper.advSelect(search,isadvancedSearch);
    }

    static GetAllResources(){
      return ResourceMapper.selectAll();
    }

    static getAllAuthors() {
        return ResourceMapper.getAllAuthors();
    }

    static getAllDirectors() {
        return ResourceMapper.getAllDirectors();
    }

    static getAllPublishers() {
        return ResourceMapper.getAllPublishers();
    }

    static getAllArtists() {
        return ResourceMapper.getAllArtists();
    }

    static EditResource(resource_id, resourceData, type){
        resourceData.id = resource_id;
       // return ResourceMapper.update(resourceData, type);
       return UnitOfWork.EditResource(resourceData, type);
    }

    static DeleteResource(id){
        //return ResourceMapper.delete(id); 
        return  UnitOfWork.DeleteResource(id);
    }

    static LoanResource(resource_id, resourceData, type, sender_id) { // must be changed
        return UnitOfWork.LoanResource( resourceData, resource_id); // must be changed with correct parameters
    }

}

module.exports = ResourceCatalog
