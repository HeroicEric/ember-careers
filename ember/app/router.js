var Router = Ember.Router.extend({
  namespace: 'api/v1',
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource('jobs', function() {
    this.route('show', { path: ':job_id' });
    this.route('new');
    this.route('edit', { path: ':job_id/edit' });
  });
});

export default Router;
