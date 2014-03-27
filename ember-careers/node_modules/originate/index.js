require('shelljs/global');
var fs = require('fs');
var color = require('cli-color');
var loom = require('loom');
var blue = color.blue;
var red = color.red;

module.exports = function() {
  maybeLogHelpOrVersion();
  validateArgs();
  run();
};

function run() {
  var origin = process.argv[2];
  var moduleName;
  if (origin[0] == '.') {
    moduleName = origin;
    origin = origin.match(/originate-(.+)/)[1]
  } else {
    moduleName = 'originate-'+origin;
  }
  var dest = process.argv[3];
  if (origin.match('@')) {
    origin = origin.replace(/@.+/, '');
  }
  var createdNodeModulesDir = false;
  var loomPath = 'node_modules/'+moduleName+'/loom';
  var options = process.argv.slice(4, process.argv.length).join(' ');
  var loomCommand = '--path '+loomPath+' '+origin+' '+dest+' '+options;

  ensureNodeModules();
  installModule();
  validateInstall();
  loom(loomCommand, afterLoom);

  function afterLoom() {
    var mod;
    try {
      mod = require(process.cwd()+'/node_modules/'+moduleName);
    } catch(e) {}
    cleanup();
    cd(dest);
    if ('function' == typeof mod) {
      mod();
    }
    log('your new '+origin+' project is waiting at '+ dest);
  }

  function ensureNodeModules() {
    if (!fs.existsSync('node_modules')) {
      createdNodeModulesDir = true;
      log('making temporary node_modules directory');
      mkdir('node_modules');
    }
  }

  function installModule() {
    log('installing '+moduleName);
    exec('npm install '+moduleName);
  }

  function validateInstall() {
    var dir = 'node_modules/'+moduleName;
    if (!fs.existsSync(dir)) {
      log(red('could not install '+moduleName+' from npm, exiting\n'));
      process.exit();
    }
  }

  function cleanup() {
    log('removing node_modules/'+moduleName);
    rm('-rf', 'node_modules/'+moduleName);
    if (createdNodeModulesDir) {
      log('removing temporary node_modules directory');
      rm('-rf', 'node_modules');
    }
  }
};

function log(msg) {
  console.log('\n'+blue('originate:'), msg);
}

function logHelp() {
  console.log('\n  Usage:');
  console.log('\n    originate <origin[@version]> <project-path> <options>');
  console.log('\n  Example:');
  console.log('\n    originate ember my-app\n    originate ember@1.0.2 my-app');
  console.log('\n  Creating Origins:');
  console.log('\n    Publish projects to npm as "originate-<name>" to create\n    new origins; others can then use them immediately.');
  console.log('\n');
}

function maybeLogHelpOrVersion() {
  if (!process.argv[2]) {
    return;
  }
  if (process.argv[2].match(/(--help|-h)/)) {
    logHelp();
    process.exit();
  }
  if (process.argv[2].match(/(--version|-v)/)) {
    console.log('v'+require('./package').version);
    process.exit();
  }
}

function validateArgs() {
  if (process.argv.length < 4) {
    logHelp();
    process.exit();
  }
}

