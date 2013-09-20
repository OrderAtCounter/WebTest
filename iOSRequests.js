var assert = require('assert');
var request = require('request');
var should = require('should');

var url = 'http://orderatcounter.herokuapp.com/';

var sessionId;
var orderNumber;

describe('iOSRequest', function() {
  describe('#iOSLogin', function() {
    it('should respond with 200 OK and a sessionId.', function(callback) {
      var data = {email: 'testing@test.com', password: 'test'};
      request.post({
        headers: {'content-type' : 'application/json'},
        url: url + 'iOSLogin',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        should.exist(body.sessionId);
        assert.equal(200, response.statusCode);
        sessionId = body.sessionId;
        callback();
      });
    });
  });
  describe('#iOSOrder', function() {
    it('should respond with 200 OK.', function(callback) {
      var data = {email: 'testing@test.com', sessionId: sessionId, orderNumber: 999, phoneNumber: 5051123312};
      request.post({
        headers: {'content-type' : 'applcation/json'},
        url: url + 'iOSOrder',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        should.exist(body.orderNumber);
        assert.equal(200, response.statusCode);
        orderNumber = body.orderNumber;
        callback();
      });
    });
  });
  describe('#iOSRemoveOrder', function() {
    it('should respond with 200 OK.', function(callback) {
      var data = {email: 'testing@test.com', sessionId: sessionId, orderNumber: orderNumber};
      request.post({
        headers: {'content-type' : 'application/json'},
        url: url + 'iOSRemoveOrder',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        console.log(body);
        assert.equal(200, response.statusCode);
        callback();
      });
    });
  });
  describe('#iOSLogout', function() {
    it('should respond with 200 OK', function(callback) {
      var data = {email: 'testing@test.com', sessionId: sessionId};
      request.post({
        headers: {'content-type' : 'application/json'},
        url: url + 'iOSLogout',
        json: data
      }, function(err, response, body) {
        if(err) throw err;
        assert.equal(200, response.statusCode);
        callback();
      });
    });
  });
});