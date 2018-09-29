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
        UserCatalog.GetUser(email, ({status,results})=>{
            if(results.length == 0  || status == 1){
                handler({status: 1, results})
            } else{
                const pass_hash = this.bestHashEver(password),
                        isAuthorized= pass_hash == results[0].password_hash,
                        isAdmin=results[0].isAdmin

                if(isAuthorized)
                    UserCatalog.SetIsActive(email, 1, (r)=> r)
                handler({status: isAuthorized?0:1, results: {isAuthorized,isAdmin}})
            }
        })
    }

    static bestHashEver(password){
        return password;
    }

}

module.exports = AuthorizationService;