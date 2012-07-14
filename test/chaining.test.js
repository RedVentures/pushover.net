
var assert = require('assert');
var pushover = require('../index');
var config = require('../creds.json');

describe('.pushover chaining', function() {

  var po = pushover({
    user: config.user,
    token: config.token
  });

  po.push('message 1');
  po.push('message 2');
  po.push('message 3');


  it('should have three messages in the outbox', function() {
    assert.equal(po.outbox.length, 3);
    assert.equal(po.outbox[0], 'message 1');
    assert.equal(po.outbox[1], 'message 2');
    assert.equal(po.outbox[2], 'message 3');
  });

  it('should send all messages', function(done) {
    po.end(function(err, reply) {
      assert.ifError(err);
      assert.equal(reply.status, 1);
      assert.equal(po.outbox.length, 0);
      done();
    });
  });

});