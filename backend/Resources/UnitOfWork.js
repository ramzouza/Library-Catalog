const IdentifyMap = require("../IdentityMap.js");
const ResourceMapper = require('./ResourceMapper');

var unitofwork = [];
var index = 0;

class UnitOfWork {
    static InsertResource(resourceData, type){
       unitofwork[index] = {resourceData,type, operation: 'insert',resource:resourceData}
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

            if(unitofwork[i].operation == 'insert'){
                res = ResourceMapper.insert(unitofwork[i].resourceData, unitofwork[i].type);
                if(res.status == 1){
                    return res
                }
            }
            if(unitofwork[i].operation == 'update'){
                ResourceMapper.update(unitofwork[i].resourceData, unitofwork[i].type);
                if(res.status == 1){
                    return res
                }
            }
            if(unitofwork[i].operation == 'delete'){
                ResourceMapper.delete(unitofwork[i].id);
                if(res.status == 1){
                    return res
                }
            }
        }

        return {status : 0, message : 'Resources have been updated.'};
    }

    static RemoveItem(index){
        try{
            unitofwork.splice(index,1)
            return {status : 0, message : "Item removed from cart", result: unitofwork}
        }catch(e){
            return {status : 1, message : 'Error' +e, e}
        }
    }

    static ViewUnitOfWork(){
        return unitofwork.map((item, index) => { return { resource: item.resource, operation: item.operation, index: index }});
    }
}


module.exports = UnitOfWork;