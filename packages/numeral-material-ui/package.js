Package.describe({
  name: 'nicolaslopezj:mrf-numeral-material-ui',
  version: '0.4.0-beta-3',
  summary: '',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'check',
    'nicolaslopezj:mrf',
    'numeral:numeral',
  ]);

  api.mainModule('main.jsx', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nicolaslopezj:mrf-percentage');
  api.addFiles('mrf-percentage-tests.js');
});
