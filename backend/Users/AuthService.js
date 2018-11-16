const UserCatalog = require('./UserCatalog')

class AuthService {
    constructor() {

    }


    static AuthenticateUser(email, password) {
        const { status, results } = UserCatalog.GetUserByEmail(email)
        console.log({ status, results })
        let message
        if (results.length == 0 || status == 1) {
            return { status: 1, results }
        } else if (results[0].isActive == 1) {
            return { status: 1, results: { isAuthenticated: false }, message: "User is already logged in on another machine" }
        } else {
            const pass_hash = this.bestHashEver(password)
            const isAuthenticated = (pass_hash == results[0].password_hash)
            message = 'Wrong email and/or password.'
            if (isAuthenticated) {
                message = 'Welcome'
            }
            const isAdmin = results[0].isAdmin
            const id = results[0].id

            return { status: isAuthenticated ? 0 : 1, results: { id, isAuthenticated, isAdmin } }
        }
    }

    static AuthorizeUser(id, requiresAdmin) {
        const { status, message, results } = UserCatalog.GetUserById(id);
        if (status == 1 || results.length == 0) {
            return { status: 1, message, isAuthorized: false };
        } else {
            const user = results;
            return { status, message, isAuthorized: requiresAdmin == user.isAdmin };
        }
    }

    static bestHashEver(password) {
        return password;
    }

}

module.exports = AuthService;
