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
   * The SimpleSchema for the form.
   */
  schema: React.PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: React.PropTypes.string.isRequired,

  /**
   * Set to true to enable automatic form submission for a type="update" form. Whenever the form change event is emitted, the change will be automatically saved to the database.
   */
  autoSave: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep empty string values when cleaning the form document.
   */
  removeEmptyStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip filtering out unknown properties when cleaning the form document.
   */
  filter: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep leading and trailing spaces for string values when cleaning the form document.
   */
  trimStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip autoconverting property values when cleaning the form document.
   */
  autoConvert: React.PropTypes.bool,

  /**
   * Replace the current document if the one in the props changes.
   */
  replaceOnChange: React.PropTypes.bool,

  /**
   * Keep arrays when updating.
   */
  keepArrays: React.PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: React.PropTypes.func,

  /**
   * Id of the form.
   */
  formId: React.PropTypes.string,

  /**
   * The component for the array wrapper
   */
  arrayComponent: React.PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: React.PropTypes.any,
};

const defaultProps = {
  keepArrays: true,
  autoSave: false,
  removeEmptyStrings: true,
  trimStrings: true,
  autoConvert: true,
  filter: true,
  replaceOnChange: true,
  formId: 'defaultFormId',
  arrayComponent: MRF.Array,
  objectComponent: MRF.Object,
};

class FormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      doc: _.clone(this.props.doc) || {},
      changes: {},
      validationContext: this.props.collection.simpleSchema().newContext(),
      errorMessages: {},
    };

    this.autoSave = _.throttle(this.submit.bind(this), 500, { leading: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
      if (!_.isEqual(nextProps.doc, this.state.doc)) {
        this.setState({ doc: _.clone(nextProps.doc) || {}, changes: {} });
      }
    }
  }

  onCommit(error, docId) {
    this.setState({ errorMessages: {} });
    if (error) {
      this.handleError(error);
    } else {
      if (_.isFunction(this.props.onSuccess)) {
        this.props.onSuccess(docId);
        this.setState({ changes: {} });
      }
    }
  }

  getValidationOptions() {
    return {
      validationContext: this.props.formId,
      filter: this.props.filter,
      autoConvert: this.props.autoConvert,
      removeEmptyStrings: this.props.removeEmptyStrings,
      trimStrings: this.props.trimStrings,
    };
  }

  submit() {
    if (this.props.type == 'insert') {
      var doc = DotObject.object(DotObject.dot(this.state.changes));
      this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this));
    } else if (this.props.type == 'update') {
      var modifier = MRF.Utility.docToModifier(this.state.changes, { keepArrays: this.props.keepArrays });
      if (!_.isEqual(modifier, {})) {
        this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this));
      } else {
        this.props.onSuccess();
      }
    }
  }

  handleError(error) {
    console.log(error);
    var context = this.props.collection.simpleSchema().namedContext(`mrf${this.props.type}`);
    var invalidKeys = context.invalidKeys();
    var errorMessages = {};
    invalidKeys.map((field) => {
      errorMessages[field.name] = context.keyErrorMessage(field.name);
    });
    this.setState({ errorMessages });
  }

  onValueChange(fieldName, newValue) {
    DotObject.del(fieldName, this.state.doc);
    var doc = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.doc }).val;
    DotObject.del(fieldName, this.state.changes);
    var changes = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.changes }).val;
    this.setState({ doc, changes });

    if (this.props.autoSave) {
      this.autoSave();
    }
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      var options = null;
      if (child.type && child.type.recieveMRFData) {
        var fieldName = child.props.fieldName;
        options = {
          collection: this.props.collection,
          value: this.state.doc ? DotObject.pick(fieldName, this.state.doc) : undefined,
          onChange: this.onValueChange.bind(this),
          errorMessage: this.state.errorMessages[fieldName],
          errorMessages: this.state.errorMessages,
        };
      } else if (child.props) {
        options = {
          children: this.renderChildren(child.props.children),
        };
      }

      return options ? React.cloneElement(child, options) : child;
    });
  }

  generateInputsForKeys(keys, parent = '') {
    var schema = this.props.collection.simpleSchema();
    keys = _.reject(keys, (key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var keySchema = schema._schema[fullKey];
      var options = keySchema.mrf;
      if (options && options.omit) return true;
    });
    return keys.map((key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var keySchema = schema._schema[fullKey];
      var type = MRF.getFieldTypeName(keySchema);
      if (type == 'array') {
        var _keys = schema.objectKeys(`${fullKey}.$`);
        return (
          <this.props.arrayComponent fieldName={key} key={key}>
            {this.generateInputsForKeys(_keys, `${fullKey}.$`)}
          </this.props.arrayComponent>
        );
      } else if (type == 'object') {
        var _keys = schema.objectKeys(fullKey);
        return (
          <this.props.objectComponent fieldName={key} key={fullKey}>
            {this.generateInputsForKeys(_keys, fullKey)}
          </this.props.objectComponent>
        );
      } else {
        return <MRF.Field fieldName={key} key={fullKey}/>;
      }
    });
  }

  generateChildren() {
    var schema = this.props.collection.simpleSchema();
    return this.generateInputsForKeys(schema._firstLevelSchemaKeys);
  }

  render() {
    if (!this.props.children) {
      return <div>{this.renderChildren(this.generateChildren())}</div>;
    } else {
      return <div>{this.renderChildren(this.props.children)}</div>;
    }
  }
};

FormComponent.propTypes = propTypes;
FormComponent.defaultProps = defaultProps;

MRF.Form = FormComponent;
