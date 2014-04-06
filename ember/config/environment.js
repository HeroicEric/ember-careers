module.exports = function(environment) {
  var ENV = {
    rootURL: '/',
    FEATURES: {
      // Here you can enable experimental featuers on an ember canary build
      // e.g. 'with-controller': true
    }
  };

  if (environment === 'development') {
    ENV.host = 'localhost:3000';
  }

  if (environment === 'production') {

  }

  return JSON.stringify(ENV); // Set in index.html
};
