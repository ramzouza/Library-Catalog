const IdentifyMap = require("../IdentityMap.js");
const ResourceMapper = require('./ResourceMapper');

var unitofwork = {};
var index = {};

class UnitOfWork {
    
    static InsertResource(resourceData, type, sender_id){
        console.log('Insert: ' + sender_id);
        if(index[sender_id] == undefined){
            index[sender_id] = 0;
            unitofwork[sender_id] = [];
        }
        unitofwork[sender_id][index[sender_id]]  = {resourceData,type, operation: 'insert',resource:resourceData}
       index[sender_id]++;
       return {status: 0, message: 'Insert Resource sent to cart', results: resourceData};
    }

    static EditResource(resourceData, type, sender_id){
        if(index[sender_id] == undefined){
            index[sender_id] = 0;
            unitofwork[sender_id] = [];
        }
        IdentifyMap[resourceData.id]=resourceData
        unitofwork[sender_id][index[sender_id]] = {resourceData,type, operation: 'update', resource:IdentifyMap[resourceData.id]}
        index[sender_id]++;;
        return {status: 0, message: 'Update Resource sent to cart', results: resourceData};
    }

    static DeleteResource(resourceData, type, sender_id){
        if(index[sender_id] == undefined){
            index[sender_id] = 0;
            unitofwork[sender_id] = [];
        }
        IdentifyMap[resourceData.id]=resourceData
        unitofwork[sender_id][index[sender_id]] = {resourceData,type, operation: 'delete', resource:IdentifyMap[resourceData.id]}
        index[sender_id]++;;
        return {status: 0, message: 'Delete Resource sent to cart', results: resourceData};
    }

    static save(sender_id){
            var unitOfStatus = []; // of same length as the unitofwork array
            var statusOfWork = false; // false means no error
            var errMsg;
        for (var i = 0; i < unitofwork[sender_id].length ; i++){
            unitOfStatus = [];
            statusOfWork = false;
            errMsg='';
            if(unitofwork[sender_id][i].operation == 'insert'){
                var res = ResourceMapper.insert(unitofwork[sender_id][i].resourceData, unitofwork[sender_id][i].type);
                
                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status: 0, message : 'looks good'};
                }
            }

            if(unitofwork[sender_id][i].operation == 'update'){
                
                var res = ResourceMapper.update(unitofwork[sender_id][i].resourceData, unitofwork[sender_id][i].type);
                
                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status : 0, message : 'looks good fam'};
                }
            }

            if(unitofwork[sender_id][i].operation == 'delete'){
                console.log("Skander")
                var res = ResourceMapper.delete(unitofwork[sender_id][i].resourceData.id);
                console.log("Skander2")
                if(res.status == 1){
                    statusOfWork = true;
                    errMsg = res.error;
                }
                else if(res.status == 0) {
                    statusOfWork = false;
                    unitOfStatus[i] = {status : 0, message : 'looks good brotha'};
                }
            }

            if(unitofwork[sender_id][i].operation == 'loan'){
                var res = LoanService.loanItem(unitofwork[sender_id][i].id);

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

        unitofwork[sender_id] = [];

        if(statusOfWork == false){
            return {status : 0, message : 'Resources have been updated.'};
        }
        else
            return {status : 1, message : 'Problem occured while updating resources : ' + errMsg, error:errMsg};

    }

    static RemoveItem(index, sender_id){
        try{
            unitofwork[sender_id].splice(index,1)
            return {status : 0, message : "Item removed from cart", result: unitofwork[sender_id]}
        }catch(e){
            return {status : 1, message : 'Error' +e, e}
        }
    }

    static ViewUnitOfWork(sender_id){
        if(index[sender_id] == undefined){
            unitofwork[sender_id] = [];
        }
        unitofwork[sender_id] = unitofwork[sender_id].filter(Boolean);
        return unitofwork[sender_id].map((item, index) => { return { resource: item.resource, type:item.type, operation: item.operation, index: index }});
    }
}


module.exports = UnitOfWork;
