Package.describe({
  name: 'nicolaslopezj:mrf',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: '',

  // URL to the Git repository containing the source code for this package.
  git: '',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'check',
    'react',
    'aldeed:simple-schema',
    'aldeed:collection2',
  ]);

  api.imply([
    'react',
    'aldeed:simple-schema',
    'aldeed:collection2',
  ]);

  api.addFiles([
    'init.jsx',
    'utility.js',
    'dot.js',
    'field.jsx',
    'form.jsx',
    'types.jsx',
  ], 'client');

  api.export('MRF');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nicolaslopezj:react-form');
  api.addFiles('react-form-tests.js');
});
