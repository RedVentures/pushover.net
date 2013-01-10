
var assert = require('assert');
var pushover = require('../index');
var config = require('../creds.json');

describe('.pushover w/ message and callback', function() {

  it('should send the message and invoke callback', function(done) {
    var po = pushover({
      user: config.user,
      token: config.token,
      message: 'Simple message'
    }, sent);

    function sent(err, reply) {
      if (err) return done(err);
      assert.equal(reply.status, 1);
      done();
    }
  });

  it('should send a title and url', function(done) {
    var po = pushover({
      user: config.user,
      token: config.token,
      title: 'my title',
      message: 'my message',
      url: 'http://nodejs.org',
      url_title: 'nodejs!'
    }, sent);

    function sent(err, reply) {
      if (err) return done(err);
      assert.equal(reply.status, 1);
      done();
    }
  });

});
