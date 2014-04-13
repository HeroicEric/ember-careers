import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'ember-careers', // TODO: loaded via config
  Resolver: Resolver
});

// TODO: Figure out where to actually put things like this
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  var token;
  if (!options.crossDomain) {
    token = $('meta[name="csrf-token"]').attr('content');
    if (token) {
      return jqXHR.setRequestHeader('X-CSRF-Token', token);
    }
  }
});

App.GithubAuthenticator = Ember.SimpleAuth.Authenticators.OAuth2.extend(Ember.Evented, {
  authenticate: function(credentials) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.on('externalAuthComplete', function(authData) {
        Ember.run(function() {
          if (authData.status === 'success') {
            resolve(authData);
          } else {
            reject(authData.error);
          }
        });
      })

      window.open('/auth/github', '_blank', 'width=800,height=600');
    });
  }
});

Ember.Application.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    container.register('authenticators:github', App.GithubAuthenticator);
    Ember.SimpleAuth.setup(container, application);
  }
});

loadInitializers(App, 'ember-careers');

export default App;
