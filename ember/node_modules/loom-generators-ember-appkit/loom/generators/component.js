var componentize = require('../../lib/componentize-template');
var testerize = require('../../lib/testerize-template');
var validateComponent = require('../../lib/validate-component');
var parent = require('./default');
var path = require('path');
var generator = module.exports = Object.create(parent);
var app = generator.appPath;

generator.before = function(next, env) {
  parent.before(function() {
    validateComponent(env.rawName);
    next();
  }, env);
};

generator.templates = [
  app+'/components/component.js.hbs',
  app+'/templates/components/component.hbs.hbs',
  'tests/unit/components/component-tests.js.hbs'
];

generator.savePath = function(next, env, template) {
  parent.savePath(function(savePath) {
    next(normalizeSavePath(savePath));
  }, env, template);
};

function normalizeSavePath(savePath) {
  if (isTest(savePath)) {
    return testerize(savePath);
  } else if (isTemplate(savePath)){
    return componentize(savePath);
  } else {
    return savePath;
  }
};

function isTemplate(savePath) {
  return path.extname(savePath) === '.hbs';
};

function isTest(savePath) {
  return /(-tests.js)/.test(savePath);
};
