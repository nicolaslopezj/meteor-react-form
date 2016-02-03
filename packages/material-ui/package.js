Package.describe({
  name: 'nicolaslopezj:mrf-material-ui',
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
    'izzilab:material-ui',
    'nicolaslopezj:mrf',
  ]);

  api.imply([
    'izzilab:material-ui',
    'nicolaslopezj:mrf',
  ]);

  api.addFiles([
    'components/array.jsx',
    'components/object.jsx',
    'components/string.jsx',
    'components/textarea.jsx',
    'components/number.jsx',
    'components/date.jsx',
    'components/multiple-checkbox.jsx',
    'components/select-with-method.jsx',
    'register.jsx',
  ], 'client');

  api.export('MRF');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nicolaslopezj:react-form');
  api.addFiles('react-form-tests.js');
});
