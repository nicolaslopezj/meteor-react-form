Package.describe({
  name: 'nicolaslopezj:mrf-material-ui',
  version: '0.3.1',
  summary: 'Automatic forms creation with Simple Schema and React for Material-UI',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3-modules-beta.8');
  api.use([
    'ecmascript',
    'underscore',
    'check',
    'react@0.14.3',
    'izzilab:material-ui@0.2.6',
    'nicolaslopezj:mrf@0.3.0',
  ]);

  api.imply([
    'izzilab:material-ui',
    'nicolaslopezj:mrf',
  ]);

  api.mainModule('main.jsx', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
});
