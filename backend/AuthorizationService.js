const UserCatalog = require('./UserCatalog')

class AuthorizationService {
    constructor(){

    }
    
    static MakeNewUser(id,password, isActive, firstName, lastName, physicalAddress, email, phoneNumber, isAdmin){
        
        const password_hash = this.bestHashEver(password)

        return UserCatalog.MakeNewUser({id,password_hash,
            isActive,
            firstName,
            lastName,
            physicalAddress,
            email,
            phoneNumber, isAdmin})
    }

    static AuthorizeUser(email, password){
        const {status,results} = UserCatalog.GetUserByEmail(email)

            if(results.length == 0  || status == 1){
                return {status: 1, results}
            } else{
                const pass_hash = this.bestHashEver(password)
                const isAuthorized = (pass_hash == results[0].password_hash)
                const isAdmin = results[0].isAdmin
                const id = results[0].id

                return {status: isAuthorized ? 0 : 1, results: {id,isAuthorized,isAdmin}}
            }
    }

    static bestHashEver(password){
        return password;
    }

}

module.exports = AuthorizationService;