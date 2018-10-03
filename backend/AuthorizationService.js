const UserCatalog = require('./UserCatalog')

class AuthorizationService {
    constructor(){

    }
    
    /*static MakeNewUser(password, isActive, firstName, lastName, physicalAddress, email, phoneNumber, isAdmin, handler){
        const password_hash = this.bestHashEver(password)
        UserCatalog.MakeNewUser({password_hash,
            isActive,
            firstName,
            lastName,
            physicalAddress,
            email,
            phoneNumber, isAdmin}, function ({status, message}){
                handler({status, message})
            })
    }*/

    static AuthorizeUser(email, password, handler){
        UserCatalog.GetUser(email, ({status,results}) => {
            if(results.length == 0  || status == 1){
                handler({status: 1, results})
            } else{
                const user = results[0];
                const pass_hash = this.BestHashEver(password)
                const isAuthorized = pass_hash == user.password_hash
                const isAdmin = user.isAdmin
                const id = user.id

                handler({status: isAuthorized?0:1, results: {id,isAuthorized,isAdmin}}) 
            }
        })
    }

    static CanUserDoThis(id, roleNeeded="Admin", handler=console.log){
      // CanUserDoThis takes in an id of a user and a role needed to access the call, the handler function gets called with       
       UserCatalog.GetUserById(id,  ({status, results}) => {
            if (results.length == 0){
                // if there's no users that match 
                handler({status: 1, results: {canDo:0}})
            } else{
                // theres a user that matches.
                const user = results[0];
                const canDo  = roleNeeded == "Admin" ? user.isAdmin : !user.isAdmin;
                handler({status: 0, results: {canDo}})
            }
        }) 
    
    }

    static BestHashEver(password){
        return password;
    }

}

module.exports = AuthorizationService;