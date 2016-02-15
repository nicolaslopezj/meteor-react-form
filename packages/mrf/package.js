Package.describe({
  name: 'nicolaslopezj:mrf',
  version: '0.3.2',
  summary: 'Automatic forms creation with Simple Schema and React',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'check',
    'react@0.14.3',
    'aldeed:simple-schema@1.5.3',
    'aldeed:collection2@2.8.0',
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
    'object.jsx',
    'array.jsx',
    'form.jsx',
    'types.jsx',
    'field-type.jsx',
  ], 'client');

  api.export('MRF');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
