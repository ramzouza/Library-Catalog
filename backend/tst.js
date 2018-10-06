const UserCatalog = require('./UserCatalog')
const User = require('./User')
const AuthService = require('./AuthService')

let u = new User(0, 'A', 0, 'B', 'lastname', 'C', 'G', '5', 1 )


// UserCatalog.ViewLoggedInUsers(console.log)
// let res = UserCatalog.SetIsActive(34284, 0)
// const b = UserCatalog.GetUserByEmail('ced@gmail.com')

// const res = AuthService.AuthorizeUser('ian@gmail.com', 'riball')
/*
const mockUser = {"password":"ribal",
"isActive":0,
"firstName":"ya",
"lastName":"nn",
"physicalAddress":"here",
"email":"YY@gmail.com",
"phoneNumber":"5142342342", "isAdmin":1}

res = UserCatalog.MakeNewUser(mockUser)
console.log(res)*/
console.log(AuthService.AuthorizeUser(34242, requiresAdmin=true));



