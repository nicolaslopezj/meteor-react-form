MRF.registerType = function({ type, component, description, optionsDefinition, optionsDescription, allowedTypes }) {
  MRF.Attributes[type] = { name: type, component, description, optionsDefinition, optionsDescription, allowedTypes };
};

MRF.getFieldTypeName = function(fieldSchema) {
  var typeName = null;
  if (fieldSchema.mrf && fieldSchema.mrf.type) {
    typeName = fieldSchema.mrf.type;
  } else if (fieldSchema.type === String) {
    typeName = 'string';
  } else if (fieldSchema.type === Number) {
    typeName = 'number';
  } else if (fieldSchema.type === Boolean) {
    typeName = 'boolean';
  } else if (fieldSchema.type === Date) {
    typeName = 'date';
  } else if (fieldSchema.type === Object) {
    typeName = 'object';
  } else if (fieldSchema.type === Array) {
    typeName = 'array';
  }

  return typeName;
};

MRF.getFieldType = function(fieldSchema) {
  var typeName = MRF.getFieldTypeName(fieldSchema);
  return MRF.Attributes[typeName];
};

MRF.getFieldComponent = function(fieldSchema, fieldName) {
  var type = MRF.getFieldType(fieldSchema);
  if (!type) {
    throw new Error(`No component for field "${fieldName}".`);
  }

  if (type.allowedTypes) {
    var contains = false;
    type.allowedTypes.map((allowedType) => {
      if (_.isEqual(fieldSchema.type, allowedType)) {
        contains = true;
      }
    });
    if (fieldSchema.type === Array) {
      // Field type checker disabled for arrays
      contains = true;
    }

    if (!contains) {
      throw new Error(`Type of field "${fieldName}" is not allowed for "${type.name}".`);
    }
  }

  if (type.optionsDefinition) {
    var optionsDefinition = _.clone(type.optionsDefinition);
    optionsDefinition.type = Match.Optional(String);
    optionsDefinition.passProps = Match.Optional(Object);
    var options = fieldSchema.mrf || {};
    try {
      check(options, optionsDefinition);
    } catch (e) {
      throw new Error(`MRF options of field "${fieldName}" are not allowed for "${type.name}". ${e.message}`);
    }
  }

  return type.component;
};
