'use strict';
var config = require('./config').config;
var EventTarget = require('./events')['default'];
var instrument = require('./instrument')['default'];
var objectOrFunction = require('./utils').objectOrFunction;
var isFunction = require('./utils').isFunction;
var now = require('./utils').now;
var cast = require('./promise/cast')['default'];
var all = require('./promise/all')['default'];
var race = require('./promise/race')['default'];
var Resolve = require('./promise/resolve')['default'];
var Reject = require('./promise/reject')['default'];
var guidKey = 'rsvp_' + now() + '-';
var counter = 0;
function noop() {
}
exports['default'] = Promise;
/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise’s eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  var promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error("getJSON: `" + url + "` failed with status: [" + this.status + "]");
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class RSVP.Promise
  @param {function}
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @constructor
*/
function Promise(resolver, label) {
    if (!isFunction(resolver)) {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }
    if (!(this instanceof Promise)) {
        throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
    }
    this._id = counter++;
    this._label = label;
    this._subscribers = [];
    if (config.instrument) {
        instrument('created', this);
    }
    if (noop !== resolver) {
        invokeResolver(resolver, this);
    }
}
function invokeResolver(resolver, promise) {
    function resolvePromise(value) {
        resolve(promise, value);
    }
    function rejectPromise(reason) {
        reject(promise, reason);
    }
    try {
        resolver(resolvePromise, rejectPromise);
    } catch (e) {
        rejectPromise(e);
    }
}
Promise.cast = cast;
Promise.all = all;
Promise.race = race;
Promise.resolve = Resolve;
Promise.reject = Reject;
var PENDING = void 0;
var SEALED = 0;
var FULFILLED = 1;
var REJECTED = 2;
function subscribe(parent, child, onFulfillment, onRejection) {
    var subscribers = parent._subscribers;
    var length = subscribers.length;
    subscribers[length] = child;
    subscribers[length + FULFILLED] = onFulfillment;
    subscribers[length + REJECTED] = onRejection;
}
function publish(promise, settled) {
    var child, callback, subscribers = promise._subscribers, detail = promise._detail;
    if (config.instrument) {
        instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
    }
    for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];
        invokeCallback(settled, child, callback, detail);
    }
    promise._subscribers = null;
}
Promise.prototype = {
    constructor: Promise,
    _id: undefined,
    _guidKey: guidKey,
    _label: undefined,
    _state: undefined,
    _detail: undefined,
    _subscribers: undefined,
    _onerror: function (reason) {
        config.trigger('error', reason);
    },
    then: function (onFulfillment, onRejection, label) {
        var promise = this;
        this._onerror = null;
        var thenPromise = new this.constructor(noop, label);
        if (this._state) {
            var callbacks = arguments;
            config.async(function invokePromiseCallback() {
                invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
            });
        } else {
            subscribe(this, thenPromise, onFulfillment, onRejection);
        }
        if (config.instrument) {
            instrument('chained', promise, thenPromise);
        }
        return thenPromise;
    },
    'catch': function (onRejection, label) {
        return this.then(null, onRejection, label);
    },
    'finally': function (callback, label) {
        var constructor = this.constructor;
        return this.then(function (value) {
            return constructor.resolve(callback()).then(function () {
                return value;
            });
        }, function (reason) {
            return constructor.resolve(callback()).then(function () {
                throw reason;
            });
        }, label);
    }
};
function invokeCallback(settled, promise, callback, detail) {
    var hasCallback = isFunction(callback), value, error, succeeded, failed;
    if (hasCallback) {
        try {
            value = callback(detail);
            succeeded = true;
        } catch (e) {
            failed = true;
            error = e;
        }
    } else {
        value = detail;
        succeeded = true;
    }
    if (handleThenable(promise, value)) {
        return;
    } else if (hasCallback && succeeded) {
        resolve(promise, value);
    } else if (failed) {
        reject(promise, error);
    } else if (settled === FULFILLED) {
        resolve(promise, value);
    } else if (settled === REJECTED) {
        reject(promise, value);
    }
}
function handleThenable(promise, value) {
    var then = null, resolved;
    try {
        if (promise === value) {
            throw new TypeError('A promises callback cannot return that same promise.');
        }
        if (objectOrFunction(value)) {
            then = value.then;
            if (isFunction(then)) {
                then.call(value, function (val) {
                    if (resolved) {
                        return true;
                    }
                    resolved = true;
                    if (value !== val) {
                        resolve(promise, val);
                    } else {
                        fulfill(promise, val);
                    }
                }, function (val) {
                    if (resolved) {
                        return true;
                    }
                    resolved = true;
                    reject(promise, val);
                }, 'Settle: ' + (promise._label || ' unknown promise'));
                return true;
            }
        }
    } catch (error) {
        if (resolved) {
            return true;
        }
        reject(promise, error);
        return true;
    }
    return false;
}
function resolve(promise, value) {
    if (promise === value) {
        fulfill(promise, value);
    } else if (!handleThenable(promise, value)) {
        fulfill(promise, value);
    }
}
function fulfill(promise, value) {
    if (promise._state !== PENDING) {
        return;
    }
    promise._state = SEALED;
    promise._detail = value;
    config.async(publishFulfillment, promise);
}
function reject(promise, reason) {
    if (promise._state !== PENDING) {
        return;
    }
    promise._state = SEALED;
    promise._detail = reason;
    config.async(publishRejection, promise);
}
function publishFulfillment(promise) {
    publish(promise, promise._state = FULFILLED);
}
function publishRejection(promise) {
    if (promise._onerror) {
        promise._onerror(promise._detail);
    }
    publish(promise, promise._state = REJECTED);
}