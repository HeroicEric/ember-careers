import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('markdown-editor', 'Unit - Markdown editor component');

test('preview is hidden by default', function() {
  var component = this.subject();
  equal(component.get('showPreview'), false, 'preview is hidden');
});

test('toggling markdown preview', function() {
  var component = this.subject();
  var $component = this.append();

  var markdown = "# This is a Title \n\n" +
                 "- List item 1\n" +
                 "- List item 2"

  Ember.run(function(){
    component.set('content', markdown);
  });

  equal($component.find('textarea').val(), markdown,
    'Correct Markdown in textarea');

  Ember.run(function(){
    component.send('togglePreview');
  });

  equal($component.find('h1').text(), 'This is a Title',
    'Header rendered.');
  equal($component.find('li:nth-child(1)').text(), 'List item 1',
    'First list item rendered.');
  equal($component.find('li:nth-child(2)').text(), 'List item 2',
    'Second list item rendered.');

  Ember.run(function(){
    component.send('togglePreview');
  });

  equal($component.find('textarea').val(), markdown,
    'Preview toggles back to textarea');
});
