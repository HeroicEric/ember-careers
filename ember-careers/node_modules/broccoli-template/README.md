# broccoli-template

A generic filter for Broccoli that turns template files into ES6
JavaScript modules. It wraps templates in a function call of your choice. Note
that no precompilation happens.

## Installation

```bash
npm install --save-dev broccoli-template
```

## Usage Example

```js
var filterTemplates = require('broccoli-template');
tree = filterTemplates(tree, {
  extensions: ['hbs', 'handlebars'],
  compileFunction: 'Ember.Handlebars.compile'
});
```

Given a file `template.hbs`

```handlebars
{{foo}}
```

this function will emit a file `template.js`:

```js
export default Ember.Handlebars.compile("{{foo}}");
```

### Options

#### extensions (required)

A list of file extensions that this template filter applies to.

#### compileFunction

The client-side compiler function to pass the template string into. If none is
provided, the JavaScript module will export the template string without any
compilation.

## Caveats

* Import statements are not yet supported. The `compileFunction` must be
  globally available.

* Module formats other than ES6 are not supported.
