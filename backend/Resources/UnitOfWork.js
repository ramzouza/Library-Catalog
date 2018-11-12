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
        if(!IdentifyMap[resourceData.id]) IdentifyMap[resourceData.id]=resourceData
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
        var unitOfStatus = []; // of same length as the unitofwork array
            var statusOfWork = false; // false means no error
            var errMsg;
        for (var i = 0; i < unitofwork.length ; i++){
            unitOfStatus = [];
            statusOfWork = false;
            errMsg='';
            if(unitofwork[i].operation == 'insert'){
                var res = ResourceMapper.insert(unitofwork[i].resourceData, unitofwork[i].type);
                
                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status: 0, message : 'looks good'};
                }
            }

            if(unitofwork[i].operation == 'update'){
                
                var res = ResourceMapper.update(unitofwork[i].resourceData, unitofwork[i].type);
                
                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status : 0, message : 'looks good fam'};
                }
            }

            if(unitofwork[i].operation == 'delete'){
                var res = ResourceMapper.delete(unitofwork[i].id);

                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status : 0, message : 'looks good brotha'};
                }
            }
        }
        
        if(statusOfWork == false){
            unitofwork = []; // clear array once completed successfully
            return {status : 0, message : 'Resources have been updated.'};
        }
        else
            return {status : 1, message : 'Problem occured while updating resources : ' + errMsg, error:errMsg};

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