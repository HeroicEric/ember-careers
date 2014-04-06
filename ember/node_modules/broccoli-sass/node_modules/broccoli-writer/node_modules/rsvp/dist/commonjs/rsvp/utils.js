'use strict';
function objectOrFunction(x) {
    return typeof x === 'function' || typeof x === 'object' && x !== null;
}
exports.objectOrFunction = objectOrFunction;
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
function isNonThenable(x) {
    return !objectOrFunction(x);
}
exports.isNonThenable = isNonThenable;
var _isArray;
if (!Array.isArray) {
    _isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    };
} else {
    _isArray = Array.isArray;
}
var isArray = _isArray;
exports.isArray = isArray;
// Date.now is not available in browsers < IE9
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
var now = Date.now || function () {
        return new Date().getTime();
    };
exports.now = now;
var keysOf = Object.keys || function (object) {
        var result = [];
        for (var prop in object) {
            result.push(prop);
        }
        return result;
    };
exports.keysOf = keysOf;