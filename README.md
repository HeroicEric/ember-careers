# Ember Careers

[Ember Careers](https://ember.careers/jobs) is an open source job board for
[Ember.js](http://emberjs.com/) jobs.

## Why

I built this project as a way of practicing building an Ember application using
[ember-cli](https://github.com/stefanpenner/ember-cli) and
[Rails](http://rubyonrails.org/). Another goal was to provide an example of one
way to go about using ember-cli and Rails for the community.

## Deploying

The Rails app is the only part that we want to push when deploying. Since the
Rails app is in a separate directory, this can be done using [git
subtree](http://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/).

```bash
git subtree push --prefix server production master
```

## Contributing

I'd love to get feedback on how to do things better, and pull requests are a
great way to do that.

If you have a feature request, please post an issue.
