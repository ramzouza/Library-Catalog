const UserCatalog = require('./UserCatalog')
const User = require('./User')
const Auth = require('./AuthorizationService')

Auth.MakeNewUser('admin', 0,'admin', 'admin', "here","admin@gmail.com","4123424",1,console.log)
// let u = new User('mypass', 0, 'Mola','Ng', 'test','ced@thug,com', '412324')

// UserCatalog.ViewLoggedInUsers(console.log)
// UserCatalog.GetUser('sdf',console.log)