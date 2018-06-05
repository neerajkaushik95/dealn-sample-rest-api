const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  it('should handle express validation errors', (done) => {
    request(app)
      .post('/user/create')
      .send({
        email: 'test111@gmail.com'
      })
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body.message).to.equal('Bad Request');
        expect(res.body.errors).to.be.an('array');
        done();
      })
      .catch(done);
  });

  let user = {
    email: 'testt123@gmail.com',
    password: 'Test@123',
    uid: 'fadsfdsfx',
    role: 'user',
    firstName: 'Joe',
    lastName: 'Doe'
  };

  describe('# POST /user/create', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/user/create')
        .send(user)
        .expect(httpStatus.Created)
        .end((err, res) => {
          if (err) {
            done();
          } else {
            expect(res.body.message).to.equal('User created');
            expect(res.body.email).to.equal(user.email);
            user = res.body;
            done();
          }
        });
    });
  });
});
