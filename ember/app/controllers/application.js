export default Ember.Controller.extend({
  menuIsExpanded: false,

  actions: {
    toggleMenu: function() {
      this.toggleProperty('menuIsExpanded');
    }
  }
});
