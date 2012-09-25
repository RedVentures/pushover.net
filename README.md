Client library for sending IOS and Android push notifications with [Pushover](https://pushover.net/).

## Install
*****

```shell
npm install pushover.net
```

## Usage
*****

Send single messages and invoke a callback afterwards.

```javascript
var pushover = require('pushover.net');

pushover({
  user: 'user',
  token: 'token',
  message: 'yoyoyo'
}, function(err, ok) {

});
```

*****

Create a single message and send it later with `end()` with or with out a callback.

```javascript
var pushover = require('pushover.net');

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
var pushover = require('pushover.net');

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
var pushover = require('pushover.net');

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

## Attribution
Pushover is a trademark and product of Superblock, LLC.

## License

Copyright 2012 Red Ventures

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.