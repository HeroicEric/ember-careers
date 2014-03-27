export default DS.Model.extend({
  description: DS.attr('string'),
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  category: DS.attr('string')
});
