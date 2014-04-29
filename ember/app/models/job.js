export default DS.Model.extend({
  description: DS.attr('string'),
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  category: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),

  summary: function() {
    return "%@1 wants a %@2".fmt(this.get('company'), this.get('title'));
  }.property('title', 'company')
});
