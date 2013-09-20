var assert = require('assert');
var request = require('request');
var should = require('should');

var url = 'http://orderatcounter.herokuapp.com/';

describe('WebRequest', function() {
  describe('#createAccount', function() {
    it('should respond with error that user already exists.', function(callback) {
      var data = {email: 'testing@test.com', password: 'test', confirmPassword: 'test', businessName: 'My Business'};
      request.post({
        headers: {'content-type' : 'application/json'},
        url: url + 'createAccount',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        assert.equal(500, response.statusCode);
        assert.equal(body, 'There is already a user with that username.');
        callback();
      });
    });
  });
  describe('#login', function() {
    it('should respond with redirect.', function(callback) {
      var data = {email: 'testing@test.com', password: 'test'};
      request.post({
        headers: {'content-type' : 'application-json'},
        url: url + 'loginUser',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        assert.equal(302, response.statusCode);
        callback();
      });
    });
  });
});