export default Ember.Route.extend(
  Ember.SimpleAuth.AuthenticatedRouteMixin, {

  model: function() {
    return this.store.createRecord('job');
  },
  deactivate: function() {
    var model = this.get('controller.model');
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },
  actions: {
    save: function(model) {
      var _this = this;
      model.save().then(function() {
        _this.transitionTo('jobs.show', model);
      }, function(response) {
        _this.set('errors', response.errors);
      });
    },
    cancel: function() {
      this.transitionTo('jobs.index');
    }
  }
});
