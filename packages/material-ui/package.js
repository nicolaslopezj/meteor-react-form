Package.describe({
  name: 'nicolaslopezj:mrf-material-ui',
  version: '0.4.0-beta-3',
  summary: 'Automatic forms creation with Simple Schema and React for Material-UI',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'jsx',
    'check',
    'nicolaslopezj:mrf',
  ]);

  api.mainModule('main.jsx', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
