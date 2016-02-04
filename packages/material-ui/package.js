Package.describe({
  name: 'nicolaslopezj:mrf-material-ui',
  version: '0.0.1',
  summary: 'Automatic forms creation with Simple Schema and React for Material-UI',
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
    'izzilab:material-ui@0.2.6',
    'nicolaslopezj:mrf@0.0.1',
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
});
