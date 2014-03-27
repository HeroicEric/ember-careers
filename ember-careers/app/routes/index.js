export default Ember.Route.extend({
  redirect: function() {
    this.transitionTo('jobs.index');
  }
});
