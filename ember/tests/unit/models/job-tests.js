import { test, moduleForModel } from 'ember-qunit';

moduleForModel('job', 'Unit - Job Model');

test('summary is a combination of company and title', function() {
  expect(1);

  var job = this.subject({
    title: 'Web Wizard',
    company: 'Internets to Go'
  });

  equal(job.get('summary'), 'Internets to Go wants a Web Wizard');
});
