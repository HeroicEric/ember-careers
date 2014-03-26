# broccoli-env

Get the environment (development or production) from the BROCCOLI_ENV
environment variable.

## Usage

```js
var env = require('broccoli-env').getEnv();
console.log(env) // => 'development' or 'production'
```
