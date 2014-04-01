import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'ember-careers', // TODO: loaded via config
  Resolver: Resolver
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

export default App;