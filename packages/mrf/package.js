Package.describe({
  name: 'nicolaslopezj:mrf',
  version: '0.7.1-beta-1',
  summary: 'Automatic forms creation with Simple Schema and React',
  git: 'https://github.com/nicolaslopezj/meteor-react-form',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'jsx',
    'underscore',
    'check',
    'aldeed:simple-schema@1.5.3',
    'aldeed:collection2@2.8.0',
    /**
     * This dep is temporal until #5890 is fixed.
     */
    'npmdeps',
  ]);

  api.imply([
    'aldeed:simple-schema',
    'aldeed:collection2',
    'npmdeps',
  ]);

  api.mainModule('init.jsx', 'server');
  api.mainModule('init.jsx', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
