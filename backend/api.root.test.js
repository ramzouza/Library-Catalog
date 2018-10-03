const app = require('./Controller')
const chai = require('chai')
  ,chaiHttp = require('chai-http')  
  chai.use(chaiHttp)
  const expect = chai.expect

describe('root route test', ()=> {
  it('should return the message \"healthy\"', done => {

    chai.request(app)
    .get('/')
    .then(res => {

      expect(res.body.message).to.equal('healthy');


      done()
    }).catch( err => {
      console.log(err)
      expect(err).not.be.null;
      
      done()
    })
  })})



// chai.request(app)
//   .post('/login')
//   .send({email: 'admin@gmail.com', password: 'admin'})
//   .end(function (err, res) {
//     expect(err).to.be.null;
//     expect(res.body).to.have.property('message')
//     expect(res.body.message).to.be.equals('Welcome');
//     // expect(res.text).to.have.status(200);
//   })


