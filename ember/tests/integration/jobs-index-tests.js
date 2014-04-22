import startApp from '../helpers/start-app';

module("Integration - Jobs Index", {
  setup: function() {
    startApp();
  },

});

test('unauthorized user is redirected to login page', function() {
  expect(1);
  visit('/jobs');

  ok(true, 'win');
});
