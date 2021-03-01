let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = chai.should();

chai.use(chaiHttp);

const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJwYXNzd29yZCI6IkFiY0AxMjM0NTYiLCJpYXQiOjE2MTQ1OTM5NzEsImV4cCI6MTYxNDY4MDM3MSwiYXVkIjoiaHR0cHM6Ly93d3cudGVjaGJhc2V2bi5jb20vIiwiaXNzIjoidGVjaGJhc2UiLCJzdWIiOiJ0YnYtcmVjcnVpdGluZ0BtYWlsLnlhaG9vLmNvLmpwIn0.CVcoGIvyzEeeSsSXweMzuErfoxr_X6PatVvkTA41BAiO7kNCQC2byathGUyaWVGhIMAMDOLpJxxsPp_54UtkHxCbJugnefEv5lFrT4Vs8QB0duyRk9hoXhqeLpGbixKnnWoBCDqLEiMYer_WVliDc9Av6rdOOklQ78096wRPn1PBbJN_kFe-JxyzbjOm7tH4SACK1VfgqMUfN9COrvhrdeLnfeir-EKsi18_-On6FIYFx-nq0w0aGUsgsv6IjYP4wmXIOOPY0ErWqyPaBIndGUGTQSIAJy_PWzUAp4LqvXcc4lpJuLaAdp39sUeudNhxtpk3Wp-8QDObfkjjav-62A';

describe('techbase challenge', function () {
    this.timeout(5000);
    beforeEach((done) => {
        setTimeout(done, 3000)
    });

    describe('/teams', () => {
      it('it should set authorization', (done) => {
        chai.request(server)
          .get('/web/teams')
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });

    describe('/teams', () => {
      it('it should set authorization', (done) => {
        chai.request(server)
          .get('/web/teams/6')
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });
})
