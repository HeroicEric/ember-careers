## **Update:** I'm no longer working on this because the Ember.js team set up [their own job board](http://jobs.emberjs.com/)

# Ember Careers

[Ember Careers](https://ember.careers/jobs) is an open source job board for
[Ember.js](http://emberjs.com/) jobs.

## Why

I built this project as a way of practicing building an Ember application using
[ember-cli](https://github.com/stefanpenner/ember-cli) and
[Rails](http://rubyonrails.org/). Another goal was to provide an example of one
way to go about using ember-cli and Rails for the community.

## Running the app

There is a rake task that will start up both the Rails server and the ember-cli
server.

```bash
rake run
```

## Deploying

The Rails app is the only part that we want to push when deploying. Since the
Rails app is in a separate directory, this can be done using [git
subtree](http://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/).

To make this process easier, there is a rake task that will handle building the
ember assets, copy them over to the correct place in the Rails app, and then
deploy to a `production` remote.

```bash
rake deploy
```

**Note: You will need to manually create a branch called `pre-deploy`.**

## Contributing

I'd love to get feedback on how to do things better, and pull requests are a
great way to do that.

If you have a feature request, please post an issue.

## Todo

- Admin dashboard
- Test all the Ember things
- Tweet new jobs
- Analytics for jobs that you've posted
- Choose length for posting to stay active
