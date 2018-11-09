const IdentifyMap = require("../IdentityMap.js");
const ResourceMapper = require('./ResourceMapper');

var unitofwork = [];
var index = 0;
var callbackMsg = "";

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
        for (i = 0; i < unitofwork.length() ; i++){
            var unitOfStatus = []; // of same length as the unitofwork array

            if(unitofwork[i].operation == 'insert'){
                res = ResourceMapper.insert(unitofwork[i].resourceData, unitofwork[i].type);
                
                if(res.status == 1){
                    return { status : 1, message: 'Something went wrong while updating this resource... ' + error, error}
                }
                else if(res.status == 0) {
                    unitOfStatus[i] = {status: 0, message : 'looks good'};
                }
            }

            if(unitofwork[i].operation == 'update'){
                ResourceMapper.update(unitofwork[i].resourceData, unitofwork[i].type);

                if(res.status == 1){
                    return { status : 1, message: 'Something went wrong while updating this resource... ' + error, error}
                }
                else if(res.status == 0) {
                    unitOfStatus[i] = {status : 0, message : 'looks good fam'};
                }
            }

            if(unitofwork[i].operation == 'delete'){
                ResourceMapper.delete(unitofwork[i].id);

                if(res.status == 1){
                    return { status : 1, message: 'Something went wrong while updating this resource... ' + error, error}
                }
                else if(res.status == 0) {
                    unitOfStatus[i] = {status : 0, message : 'looks good brotha'};
                }
            }
        }
        
        if(unitOfStatus.length() != 0 || status == 0)
            return {status : 0, message : 'Resources have been updated.'};
        else
            return {status : 0, message : 'Problem occured while updating resources : '+error, error};

        //Once saved, remove all items in the unit of work array
        unitofwork = [];
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