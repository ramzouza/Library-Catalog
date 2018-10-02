const UserCatalog = require('./UserCatalog')

class AuthorizationService {
    constructor(){

    }
    
    static MakeNewUser(password, isActive, firstName, lastName, physicalAddress, email, phoneNumber, isAdmin, handler){
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
    }

    static AuthorizeUser(email, password, handler){
        UserCatalog.GetUser(email, ({status,results}) => {
            if(results.length == 0  || status == 1){
                handler({status: 1, results})
            } else{
                const pass_hash = this.bestHashEver(password)
                const isAuthorized = pass_hash == results[0].password_hash
                const isAdmin = results[0].isAdmin
                const id = results[0].id

                if(isAuthorized)
                    UserCatalog.SetIsActive(email, 1, (r)=> r)
                handler({status: isAuthorized?0:1, results: {id,isAuthorized,isAdmin}}) 
            }
        })
    }

    static CanUserDoThis(id, roleNeeded="Admin", handler){
    // let me start coding and jump in where u feel helpful
    // ok, but first, look into usercatalog, what parameters are expected in the GetUser method. email/handler            
       UserCatalog.GetUserById(id,  ({status, results}) => {
            if (results.length == 0){
                // if there's no user do this body.
                handler({status: 0, results: {canDo:0}})
            } else{
                // theres a user that matches.
                const user = results[0];
                const canDo  = roleNeeded == "Admin" ? user.isAdmin : !user.isAdmin;
                handler({status: 1, results: {canDo}})
            }
        }) 
    
    }

    static bestHashEver(password){
        return password;
    }

}

module.exports = AuthorizationService;