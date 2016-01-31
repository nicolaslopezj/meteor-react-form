MRF.registerAttribute = function({ type, component, schema }) {
  MRF.Attributes[type] = { type, component, schema };
  MRF.Attribute[type] = function(overrideSchema, options) {
    var typeSchema = _.clone(_.isFunction(schema) ? schema(options) : schema);
    return _.extend(typeSchema, overrideSchema, {
      mrf: {
        type: type,
        options: options,
      },
    });
  };
};

MRF.getFieldTypeName = function(fieldSchema) {
  var typeName = null;
  if (fieldSchema.mrf && fieldSchema.mrf.type) {
    typeName = fieldSchema.mrf.type;
  } else if (fieldSchema.type === String) {
    typeName = 'String';
  } else if (fieldSchema.type === Number) {
    typeName = 'Number';
  } else if (fieldSchema.type === Boolean) {
    typeName = 'Boolean';
  } else if (fieldSchema.type === Date) {
    typeName = 'Date';
  } else if (fieldSchema.type === Object) {
    typeName = 'Object';
  } else if (fieldSchema.type === Array) {
    typeName = 'Array';
  }

  return typeName;
};

MRF.getFieldType = function(fieldSchema) {
  return MRF.Attributes[MRF.getFieldTypeName(fieldSchema)];
};

MRF.getFieldComponent = function(fieldSchema) {
  var type = MRF.getFieldType(fieldSchema);
  return type.component;
};
