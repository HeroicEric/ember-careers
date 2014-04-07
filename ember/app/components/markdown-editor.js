export default Ember.Component.extend({
  classNames: ['markdown-editor'],
  content: '',
  rows: null,
  placeholder: null,
  showPreview: false,

  preview: function() {
    var content = this.get('content') || '';
    var html = markdown.toHTML(content);

    return new Handlebars.SafeString(html);
  }.property('content'),

  actions: {
    togglePreview: function() {
      this.toggleProperty('showPreview');
    }
  }
});
