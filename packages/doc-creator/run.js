MRFDocCreator = {};

const codeBlock = '```';

MRFDocCreator.run = function() {
  return _.sortBy(_.keys(MRF.Attributes), (name) => name).map((name) => {
    var type = MRF.Attributes[name];

    if (!type.description) return;

    return `
#### ${codeBlock}${name}${codeBlock}

${type.description}

${MRFDocCreator.getTypesFormatted(type.allowedTypes)}
${MRFDocCreator.getOptionsFormatted(type.optionsDefinition, type.optionsDescription)}`;
  }).join('');
};

MRFDocCreator.getValueTypeString = function(type) {
  var visible = '';
  if (type === String) {
    visible = 'String';
  } else if (type === Number) {
    visible = 'Number';
  } else if (type === Boolean) {
    visible = 'Boolean';
  } else if (type === Date) {
    visible = 'Date';
  } else if (type === Function) {
    visible = 'Function';
  } else if (type === Object) {
    visible = 'Object';
  } else if (type === Array) {
    visible = 'Array';
  } else if (_.isEqual(type, ['__any__'])) {
    visible = 'Any';
  } else if (_.isEqual(type, ['__integer__'])) {
    visible = 'Integer';
  } else if (_.isArray(type)) {
    if (type[0] === String) {
      visible = '[String]';
    } else if (type[0] === Number) {
      visible = '[Number]';
    } else if (type[0] === Boolean) {
      visible = '[Boolean]';
    } else if (type[0] === Date) {
      visible = '[Date]';
    } else if (type[0] === Function) {
      visible = 'Function';
    } else if (_.isEqual(type[0], ['__any__'])) {
      visible = '[Any]';
    } else if (_.isEqual(type, ['__integer__'])) {
      visible = 'Integer';
    }
  }

  return visible;
};

MRFDocCreator.getTypesFormatted = function(types) {
  if (!types) return 'Allowed types: ```Any```.';
  var formatted = types.map((type) => `${codeBlock}${MRFDocCreator.getValueTypeString(type)}${codeBlock}`);
  if (!formatted) return 'Allowed types: ```Any```.';

  return `Allowed types: ${formatted.join('')}.`;
};

MRFDocCreator.getOptionsFormatted = function(types, descriptions) {
  if (!types || !descriptions) return '';

  var options = _.keys(types).map((key) => {
    var type = '';

    if (types[key].pattern) {
      type = `${codeBlock}${MRFDocCreator.getValueTypeString(types[key].pattern)}${codeBlock}`;
    } else if (types[key].choices) {
      type = types[key].choices.map((choice) => {
        var ask = _.isFunction(choice) ? choice : choice.pattern;
        return `${codeBlock}${MRFDocCreator.getValueTypeString(ask)}${codeBlock}`;
      }).join(', ');
    }

    var isOptional = types[key].constructor === Match.Optional(String).constructor;
    return `- ${codeBlock}${key}${codeBlock}: ${type}${isOptional ? ' Optional' : ''}. ${descriptions[key]}`;
  }).join('\n');
  if (!options) return '';

  return `
Options:

${options}
`;
};
