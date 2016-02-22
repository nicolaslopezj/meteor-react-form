Package.describe({
  name: 'nicolaslopezj:mrf-material-ui',
  version: '0.4.0-beta-2',
  summary: 'Automatic forms creation with Simple Schema and React for Material-UI',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Npm.depends({
  react: '0.14.7',
  'material-ui':'0.14.4',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3-modules-beta.8');
  api.use([
    'ecmascript',
    'underscore',
    'jsx',
    'check',
    'nicolaslopezj:mrf',
  ]);

  api.imply([
    'nicolaslopezj:mrf@0.3.0',
  ]);

  api.mainModule('main.jsx', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
});
