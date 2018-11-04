const IdentifyMap = require("../IdentityMap.js");
const ResourceMapper = require('./ResourceMapper');

var unitofwork = [];
var index = 0;

class UnitOfWork {
    static InsertResource(resourceData, type){
       unitofwork[index] = {resourceData,type, operation: 'insert',resource:IdentifyMap[resourceData.id]}
       index++;
       return {status: 0, message: 'Insert Resource sent to cart', results: resourceData};
    }

    static EditResource(resourceData, type){
        unitofwork[index] = {resourceData,type, operation: 'update', resource:IdentifyMap[resourceData.id]}
        index++;
        return {status: 0, message: 'Update Resource sent to cart', results: resourceData};
    }

    static DeleteResource(id){
        unitofwork[index] = {id, operation: 'delete', resource: IdentifyMap[id]}
        index++;
        return {status: 0, message: 'Delete Resource sent to cart', results: id};
    }

    static save(){
        for (i = 0; i < unitofwork; i++){

            switch(unitofwork[i].operation){
                case 'insert': ResourceMapper.insert(unitofwork[i].resourceData, unitofwork[i].type);
                case 'update': ResourceMapper.update(unitofwork[i].resourceData, unitofwork[i].type);
                case 'delete': ResourceMapper.delete(unitofwork[i].id);
            }
        }
    }

    static ViewUnitOfWork(){
        return unitofwork.map(item => { return { resource: item.resource, operation: item.operation }});
    }
}


module.exports = UnitOfWork;