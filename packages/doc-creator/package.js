Package.describe({
  name: 'mrf-doc-creator',
  version: '0.0.1',
  summary: 'Create form types docs automatically',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore',
    'check',
    'nicolaslopezj:mrf@0.3.0',
  ]);

  api.addFiles([
    'run.js',
  ], 'client');

  api.export('MRFDocCreator');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
