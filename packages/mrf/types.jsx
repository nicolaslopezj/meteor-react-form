MRF.registerAttribute = function({ type, component, schema, defaultOptions }) {
  MRF.Attributes[type] = { type, component, schema };
  MRF.Attribute[type] = function(overrideSchema = {}) {
    var options = _.extend(defaultOptions || {}, overrideSchema.mrf || {});
    var typeSchema = _.clone(_.isFunction(schema) ? schema(options) : schema);
    var finalSchema = _.extend(typeSchema || {}, overrideSchema);
    finalSchema.mrf = options;
    finalSchema.mrfType = type;
    return finalSchema;
  };
};

MRF.getFieldTypeName = function(fieldSchema) {
  var typeName = null;
  if (fieldSchema.mrfType) {
    typeName = fieldSchema.mrfType;
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
  var typeName = MRF.getFieldTypeName(fieldSchema);
  return MRF.Attributes[typeName];
};

MRF.getFieldComponent = function(fieldSchema) {
  var type = MRF.getFieldType(fieldSchema);
  return type.component;
};
