

# node-pushover

Client library for sending IOS and Android push notifications with [Pushover](https://pushover.net/).

## Install
*****

```shell
npm install pushover.net
```

## Usage
*****

Send single messages and invoke a callback aftewards.

```javascript
var pushover = require('pushover');

pushover({
  user: 'user',
  token: 'token',
  message: 'yoyoyo'
}, function(err, ok) {

});
```

*****

Send a single message and send it later with `end()` with or with out a callback.

```javascript
var pushover = require('pushover');

var po = pushover({
  user: 'user',
  token: 'token',
  message: 'yoyoyo'
});

po.end();
```

*****

Queue up a bunch of messages with the same configuration and send them all at once.

```javascript
var pushover = require('pushover');

var po = pushover({
  user: 'user',
  token: 'token'
});

po.push('message 1');
po.push('message 2');
po.push('message 3');

po.end();
```

*****

Queue up a bunch of messages but with each having a custom configuration which will override
the initial configuration.

```javascript
var pushover = require('pushover');

var po = pushover({
  user: 'user',
  token: 'token'
});

po.push({
  title: 'title 1',
  message: 'message 1',
  priority: 1
});

po.push('message 2');

po.push({
  message: 'message 3',
  url: 'http://nodejs.org'
});

po.end();
```






