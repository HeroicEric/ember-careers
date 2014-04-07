export default Ember.Handlebars.makeBoundHelper(function(input) {
  input = input || '';
  var html = markdown.toHTML(input);

  return new Handlebars.SafeString(html);
});
