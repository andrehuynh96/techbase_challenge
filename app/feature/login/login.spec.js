let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = chai.should();
chai.use(chaiHttp);


describe('login', function () {
  this.timeout(5000);
  beforeEach((done) => {
    setTimeout(done, 3000)
  });

  describe('/login', () => {
    it('it should set login json', (done) => {
      chai.request(server)
        .post('/web/login')
        .send({
          username: 'example',
          password: 'Abc@123456'
        })
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
})
