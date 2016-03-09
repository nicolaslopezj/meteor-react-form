export default Utility = {
  // Taken from aldeed's autoform
  docToModifier: function docToModifier(doc, options) {
    var modifier = {};
    var mDoc;
    var flatDoc;
    var nulls;
    options = options || {};
    mDoc = new MongoObject(doc);
    flatDoc = mDoc.getFlatObject({
      keepArrays: !!options.keepArrays,
    });
    nulls = Utility.reportNulls(flatDoc, !!options.keepEmptyStrings);
    flatDoc = Utility.cleanNulls(flatDoc, false, !!options.keepEmptyStrings);

    if (!_.isEmpty(flatDoc)) {
      modifier.$set = flatDoc;
    }

    if (!_.isEmpty(nulls)) {
      modifier.$unset = nulls;
    }

    return modifier;
  },

  isBasicObject: function(obj) {
    return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
  },

  cleanNulls: function cleanNulls(doc, isArray, keepEmptyStrings) {
    var newDoc = isArray ? [] : {};
    _.each(doc, function(val, key) {
      if (!_.isArray(val) && Utility.isBasicObject(val)) {
        val = cleanNulls(val, false, keepEmptyStrings); //Recurse into plain objects
        if (!_.isEmpty(val)) {
          newDoc[key] = val;
        }
      } else if (_.isArray(val)) {
        val = cleanNulls(val, true, keepEmptyStrings); //Recurse into non-typed arrays
        if (!_.isEmpty(val)) {
          newDoc[key] = val;
        }
      } else if (!Utility.isNullUndefinedOrEmptyString(val)) {
        newDoc[key] = val;
      } else if (keepEmptyStrings && typeof val === 'string' && val.length === 0) {
        newDoc[key] = val;
      }
    });

    return newDoc;
  },

  reportNulls: function reportNulls(flatDoc, keepEmptyStrings) {
    var nulls = {};

    // Loop through the flat doc
    _.each(flatDoc, function(val, key) {
      // If value is undefined, null, or an empty string, report this as null so it will be unset
      if (val === null) {
        nulls[key] = '';
      } else if (val === void 0) {
        nulls[key] = '';
      } else if (!keepEmptyStrings && typeof val === 'string' && val.length === 0) {
        nulls[key] = '';
      }

      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      else if (_.isArray(val) && Utility.cleanNulls(val, true, keepEmptyStrings).length === 0) {
        nulls[key] = '';
      }
    });

    return nulls;
  },

  isNullUndefinedOrEmptyString: function isNullUndefinedOrEmptyString(val) {
    return (val === void 0 || val === null || (typeof val === 'string' && val.length === 0));
  },
};
