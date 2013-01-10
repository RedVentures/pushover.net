
/**
 * Deps.
 */

var request = require('request');

/**
 * Expose.
 */

module.exports = exports = Pushover;

/**
 * Pushover API endpoint.
 *
 * Note: While Pushover supports XML requests and responses, I don't because
 * XML sucks ass. Submit a pull request if you want need it.
 */

var endpoint = 'https://api.pushover.net/1/messages.json';

/**
 * Pushover.
 *
 * Bare bones message.
 *
 * Send message with options.
 *
 * Pipe messages in later.
 *
 * @api public
 * @param {Object} [opts]
 * @param {String} msg
 * @param {Function} [callback]
 * @return {Stream}
 */

function Pushover(opts, callback) {
  if (!(this instanceof Pushover)) return new Pushover(opts, callback);

  // required
  this.user = opts.user;
  this.token = opts.token;

  // optional
  this.device = opts.device;
  this.title = opts.title;
  this.url = opts.url;
  this.url_title = opts.url_title;
  this.priority = opts.priority;
  this.timestamp = opts.timestamp;
  this.timeout = opts.timeout;

  // this is only for testing purposes
  this.endpoint = opts.endpoint || endpoint;

  // outgoing messages
  this.outbox = [];

  // if we have a message, push it on now
  if (type(opts.message) == 'string') {
    this.push(opts.message);
  }

  // if we have a callback, send it now
  if (type(callback) == 'function') {
    this.end(callback);
  }
}

/**
 * Pushes a new message in the `outbox`.
 *
 * @api public
 * @param {String} msg
 * @return {Pushover}
 */

Pushover.prototype.push = function(msg) {
  this.outbox.push(msg);
  return this;
};

/**
 * Iterates through the `outbox` sending each message. If the `callback`
 * is defined, it will be invoked when the last response is received.
 *
 * @api public
 * @param {Function} [callback]
 * @return {Pushover}
 *
 * TODO: enforce limitations of message, url and url_title char length.
 */

Pushover.prototype.end = function(callback) {
  var outbox = this.outbox;
  var count = outbox.length;

  if (count === 0) {
    callback(new Error('no messages'));
    return this;
  }

  var pending = outbox.splice(0, count);
  var failed = null;

  pending.forEach(send, this);

  function send(msg) {
    if (failed) return;

    var defaults = {
      message: msg,
      user: this.user,
      token: this.token,
      device: this.device,
      title: this.title,
      url: this.url,
      url_title: this.url_title,
      priority: this.priority,
      timestamp: this.timestamp
    };

    var opts = null;

    if (type(msg) == 'object') {
      opts = override(defaults, msg);
      opts.message = msg.message;
    } else {
      opts = defaults;
    }

    var req = request({
      uri: this.endpoint,
      method: 'POST',
      timeout: this.timeout,
      form: opts
    }, respond);

    function respond(err, res, body) {
      if (err) return callback((failed = err));

      try {
        body = JSON.parse(body);
      } catch (e) {
        err = e;
      }

      if (0 === body.status) err = body.errors[0];
      --count || callback(err || null, body);
    }
  }

  return this;
};

/**
 * Type testing utility.
 *
 * @api private
 * @return {String}
 */

function type(value) {
  if (value === null) return 'null';
  var toString = Object.prototype.toString;
  return toString.call(value).toLowerCase().match(/\s([a-z]+)\]$/)[1];
}

/**
 * Shallowly overrides an object's properties.
 *
 * @api private
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */

function override(a, b) {
  var dupe = {};

  for (var key in a) {
    if (b.hasOwnProperty(key)) {
      dupe = b[key];
    } else {
      dupe = a[key];
    }
  }

  return dupe;
}