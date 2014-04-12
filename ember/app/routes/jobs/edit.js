export default Ember.Route.extend(
  Ember.SimpleAuth.AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.find('job', params.job_id);
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
      this.transitionTo('jobs.show', this.currentModel);
    },

    delete: function(model) {
      var _this = this;

      if (confirm("Are you sure you want to delete this job?")) {
        model.destroyRecord().then(function() {
          _this.transitionTo('jobs.index');
        }, function(response) {
          _this.set('errors', response.errors);
        });
      }
    },

    willTransition: function() {
      var model = this.get('controller.model');

      if (model.get('isNew')) {
        model.deleteRecord();
      }
    }
  }
});
