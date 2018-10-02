const app = require('./Controller')
const chai = require('chai')
  ,chaiHttp = require('chai-http')  
  chai.use(chaiHttp)
  const expect = chai.expect

chai.request(app)
  .get('/')
  .end(function (err, res) {
    console.log(res.text)
    expect(err).to.be.null;
    expect(res).to.have.status(200);
  })

chai.request(app)
  .post('/login')
  .send({email: 'admin@gmail.com', password: 'admin'})
  .end(function (err, res) {
    console.log(res.text)
    expect(err).to.be.null;
    expect(res).to.have.status(200);
  })


