const UserCatalog = require('./UserCatalog')
const User = require('./User')
const Auth = require('./AuthorizationService')

let u = new User(0, 'A', 0, 'B', 'lastname', 'C', 'G', '5', 1 )


// UserCatalog.ViewLoggedInUsers(console.log)
// let res = UserCatalog.SetIsActive(34284, 0)
// const b = UserCatalog.GetUserByEmail('ced@gmail.com')

const res = Auth.AuthorizeUser('ian@gmail.com', 'riball')
console.log(res)


const mockUser = {"password":"ribal",
"isActive":0,
"firstName":"ya",
"lastName":"nn",
"physicalAddress":"here",
"email":"ian@gmail.com",
"phoneNumber":"5142342342", "isAdmin":1}