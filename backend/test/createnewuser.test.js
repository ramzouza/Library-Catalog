const {Post} = require('../CreateTest')

const mockUser = {"password":"ribal",
"isActive":0,
"firstName":"ya",
"lastName":"nn",
"physicalAddress":"here",
"email":"ian@gmail.com",
"phoneNumber":"5142342342", "isAdmin":1}



Post('/createnewuser','User should be created',mockUser,({expect, res})=>{
    expect(res.body.message).to.equal('User exists already');
    expect(res.body.status).to.equal(1);
})