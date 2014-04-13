export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    authenticateSession: function() {
      this.get('session').authenticate('authenticators:github', {});
    },

    willTransition: function() {
      this.controller.set('menuIsExpanded', false);
    }
  }
});
