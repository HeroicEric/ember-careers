var Router = Ember.Router.extend({
  namespace: 'api/v1',
  rootURL: ENV.rootURL
});

Router.map(function() {
  this.resource('jobs', function() {
    this.route('show', { path: ':job_id' });
    this.route('new');
  });
});

export default Router;
