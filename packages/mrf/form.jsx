const propTypes = {
  /**
   * The document that has the original values for the form.
   */
  doc: React.PropTypes.object,

  /**
   * The Mongo Collection for the form.
   */
  collection: React.PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: React.PropTypes.string.isRequired,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: React.PropTypes.func,

  /**
   * Render automatically the components inside the form.
   */
  autoRender: React.PropTypes.bool,
};

MRF.Form = React.createClass({
  propTypes: propTypes,

  getInitialState() {
    return {
      doc: _.clone(this.props.doc) || {},
      validationContext: this.props.collection.simpleSchema().newContext(),
      errorMessages: {},
    };
  },

  onCommit(error, docId) {
    this.setState({ errorMessages: {} });
    if (error) {
      this.handleError(error);
    } else {
      if (_.isFunction(this.props.onSuccess)) {
        this.props.onSuccess(docId);
      }
    }
  },

  submit() {
    if (this.props.type == 'insert') {
      var doc = DotObject.object(DotObject.dot(this.state.doc));
      this.props.collection.insert(doc, { validationContext: `mrf${this.props.type}` }, this.onCommit);
    } else if (this.props.type == 'update') {
      var modifier = MRF.Utility.docToModifier(this.state.doc);
      this.props.collection.update(this.state.doc._id, modifier, { validationContext: `mrf${this.props.type}` }, this.onCommit);
    }
  },

  handleError(error) {
    console.log(error);
    var context = this.props.collection.simpleSchema().namedContext(`mrf${this.props.type}`);
    var invalidKeys = context.invalidKeys();
    var errorMessages = {};
    invalidKeys.map((field) => {
      errorMessages[field.name] = context.keyErrorMessage(field.name);
    });
    this.setState({ errorMessages });
  },

  onValueChange(fieldName, newValue) {
    this.state.doc[fieldName] = newValue;
    this.setState({ doc: this.state.doc });
  },

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      var fieldName = child.props.fieldName;
      return React.cloneElement(child, {
        collection: this.props.collection,
        value: this.state.doc ? this.state.doc[fieldName] : undefined,
        onChange: this.onValueChange,
        errorMessage: this.state.errorMessages[fieldName],
        errorMessages: this.state.errorMessages,
      });
    });
  },

  generateInputsForKeys(keys, parent = '') {
    var schema = this.props.collection.simpleSchema();
    keys = _.reject(keys, (key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var keySchema = schema._schema[fullKey];
      var options = keySchema.mrfOptions;
      if (options && options.omit) return true;
    });
    return keys.map((key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var keySchema = schema._schema[fullKey];
      var type = MRF.getFieldTypeName(keySchema);
      if (type == 'Array') {
        var _keys = schema.objectKeys(`${fullKey}.$`);
        return (
          <MRF.Array fieldName={key} key={key}>
            {this.generateInputsForKeys(_keys, `${fullKey}.$`)}
          </MRF.Array>
        );
      } else if (type == 'Object') {
        var _keys = schema.objectKeys(fullKey);
        return (
          <MRF.Object fieldName={key} key={fullKey}>
            {this.generateInputsForKeys(_keys, fullKey)}
          </MRF.Object>
        );
      } else {
        return <MRF.Field fieldName={key} key={fullKey}/>;
      }
    });
  },

  generateChildren() {
    var schema = this.props.collection.simpleSchema();
    return this.generateInputsForKeys(schema._firstLevelSchemaKeys);
  },

  render() {
    if (this.props.autoRender) {
      return <div>{this.renderChildren(this.generateChildren())}</div>;
    } else {
      return <div>{this.renderChildren(this.props.children)}</div>;
    }
  },
});
