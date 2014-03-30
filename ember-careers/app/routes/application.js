export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    authenticateSession: function() {
      this.get('session').authenticate('authenticators:github', {});
    }
  }
});
