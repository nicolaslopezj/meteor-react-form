Package.describe({
  name: 'nicolaslopezj:mrf',
  version: '0.0.1',
  summary: 'Automatic forms creation with SimpleSchema and React',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
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
