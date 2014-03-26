var inflector = require('./inflector');
var path = require('path');

// foo-bar/x-foo.hbs -> foo_bar/x-foo-tests.js
module.exports = function(savePath) {
  var basename = inflector.dasherize(path.basename(savePath));
  var dirname = path.dirname(savePath);
  return dirname+'/'+basename;
};
