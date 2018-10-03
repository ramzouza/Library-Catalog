const {Post} = require('../CreateTest')

Post('/login','message should say Welcome',{email: 'ced@gmail.com', password: 'ced'},({expect, res})=>{
    expect(res.body.message).to.equal('Welcome')   
})


Post('/login','message should say Bad Credentials',{email: 'cedd@gmail.com', password: 'ced'},({expect, res})=>{
    expect(res.body.message).to.equal('Bad Credentials')   
})
