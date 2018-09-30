const UserCatalog = require('./UserCatalog')
const User = require('./User')
const Auth = require('./AuthorizationService')

Auth.MakeNewUser('admin', 1,'administrator', 'administrator', "here","admin@gmail.com","4123424",1,console.log)
// let u = new User('pass', isActive, 'firstname','lastname', 'address','email', 'phoneNumber', isAdmin)

// UserCatalog.ViewLoggedInUsers(console.log)
// UserCatalog.GetUser('sdf',console.log)