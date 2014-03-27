module.exports = function(template, locals, callback) {
  callback(require('handlebars').compile(template)(locals));
};

