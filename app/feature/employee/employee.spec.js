let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = chai.should();

chai.use(chaiHttp);

const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJwYXNzd29yZCI6IkFiY0AxMjM0NTYiLCJpYXQiOjE2MTQ1OTIxMjMsImV4cCI6MTYxNDY3ODUyMywiYXVkIjoiaHR0cHM6Ly93d3cudGVjaGJhc2V2bi5jb20vIiwiaXNzIjoidGVjaGJhc2UiLCJzdWIiOiJ0YnYtcmVjcnVpdGluZ0BtYWlsLnlhaG9vLmNvLmpwIn0.iNxmbSzR9Zj4VL2qYIFAw1CKliLU0oBtMw1JVUlysyxX9BC8cCguaRQTvitkZeMdhXDeta1AVsQwbFsRa_kw20GwvNKJMneL4WM_XOexVewN5HdkYoAumz-cPSFl2vI4929sd469gwQTuLl0tuH0GWZCdOrR9-vXh0x9_tizPAldz_Um-rAM9fzJeCYZLoEMC18QtxAb5Cb94Oy9bjQQX_-XU6jzfSVtLmTZl1yqKwaRD9L8tnrQ8bS1fLJbEQXuw3T7UzxHbAugSVkziBiDfPLuj0odDSuOSwqjasOnaoWXMrl-ZBGsDmpk9Bst33vO_rhbRmsz1JFRdFxDfID5jA';

describe('techbase challenge', function () {
    this.timeout(5000);
    beforeEach((done) => {
        setTimeout(done, 3000)
    });

    describe('/employees', () => {
      it('it should set authorization', (done) => {
        chai.request(server)
          .get('/web/employees')
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });

    describe('/employees', () => {
      it('it should set authorization', (done) => {
        chai.request(server)
          .get('/web/employees/2')
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
