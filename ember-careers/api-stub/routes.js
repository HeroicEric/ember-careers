/* global module */
module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
  server.namespace('/api', function() {

    server.get('/jobs', function(req, res) {
      var jobs = {
        "jobs": [{
          "id": 1,
          "title": "Senior Ember Dev",
          "body": "Awesome ember job",
          "company": "GitHub"
        }, {
          "id": 2,
          "title": "Junior Embereno",
          "body": "Semi-awesome ember job",
          "company": "Launch Academy"
        }, {
          "id": 3,
          "title": "Angular Dev",
          "body": "Do you want to write your own framework? Come work with us!",
          "company": "Google"
        }]
      };

      res.send(jobs);
    });

    server.get('/jobs/:id', function(req, res) {
      var job = {
        "job": {
          "id": 1,
          "title": "Senior Ember Dev",
          "body": "Awesome ember job",
          "company": "GitHub"
        }
      };

      res.send(job);
    });
  });
};
