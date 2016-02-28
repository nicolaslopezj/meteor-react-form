Package.describe({
  name: 'nicolaslopezj:mrf-numeral-material-ui',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: '',

  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nicolaslopezj/meteor-react-form',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'nicolaslopezj:mrf', 'izzilab:material-ui', 'react', 'numeral:numeral']);
  /*api.addFiles([
    'percentage.jsx',
    'number.jsx',
    'money.jsx',
  ], 'client');*/
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nicolaslopezj:mrf-percentage');
  api.addFiles('mrf-percentage-tests.js');
});
