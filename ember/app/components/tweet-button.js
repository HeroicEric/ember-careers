export default Ember.Component.extend({
  lang: 'en',
  buttonText: 'Tweet',
  tweetText: 'Check out this awesome Ember job!',

  twitterJs: function() {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  }.on('didInsertElement')
});
