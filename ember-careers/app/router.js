var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('jobs', function() {
    this.route('show', { path: ':job_id' });
  });
});

export default Router;
