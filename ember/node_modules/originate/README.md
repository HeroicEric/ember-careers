originate
=========

Command line tool that generates new project scaffolds with [loom][1]
and npm. Included as a peerDepency of [loom][1].

Installation
------------

```sh
npm install -g originate
# or, preferably
npm install -g loom
# originate is a peerDependency of loom
```

Usage
-----

```sh
$ originate <origin[@version]> <project-path>
# for example:
$ originate ember my-app
$ originate ember@1.0.2 my-app
```

Creating Origins
----------------

Creating origins is simple with the [originate-origin origin][2] (yo dawg, I
heard you like origins):

```sh
$ originate origin originate-foo
# so I put some origins in your origin
$ cd originate-foo
# make some templates in loom/templates
# maybe configure your generator in loom/generators/foo.js
# so you can originate while you originate
$ npm publish
```

That's it, now people can use it with `originate foo my-app`.

A little more information is available at the [originate-origin][2]
repository.

Licences and Copyright
----------------------

MIT Style licence

(c) 2013 Ryan Florence

  [1]:https://github.com/rpflorence/loom
  [2]:https://github.com/rpflorence/originate-origin

