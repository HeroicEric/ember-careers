export default Ember.Component.extend({
  classNames: ['markdown-editor'],
  content: '',
  rows: 15,
  placeholder: 'You can write **Markdown** here!',
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
