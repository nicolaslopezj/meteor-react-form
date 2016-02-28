const propTypes = {
  /**
   * Value of the object.
   */
  value: React.PropTypes.any,

  /**
   * Mongo Collection of the parent object.
   */
  collection: React.PropTypes.object,

  /**
   * Error message for the object, if there is one.
   */
  errorMessage: React.PropTypes.string,

  /**
   * Children error messages.
   */
  errorMessages: React.PropTypes.object,

  /**
   * Field name of the object in the parent object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: React.PropTypes.func,
};

class ObjectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSchema() {
    return this.props.collection.simpleSchema();
  }

  getFieldSchema() {
    return this.getSchema().schema(this.props.fieldName);
  }

  getLabel() {
    return this.getSchema().label(this.props.fieldName);
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      var fieldName = child.props.fieldName;
      var options = {};
      if (child.type.recieveMRFData) {
        options = {
          fieldName: `${this.props.fieldName}.${fieldName}`,
          collection: this.props.collection,
          value: this.props.value ? this.props.value[fieldName] : undefined,
          onChange: this.props.onChange,
          errorMessage: this.props.errorMessages ? this.props.errorMessages[`${this.props.fieldName}.${fieldName}`] : undefined,
          errorMessages: this.props.errorMessages,
        };
      } else {
        options = {
          children: this.renderChildren(child.props.children),
        };
      }

      return React.cloneElement(child, options);
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
      </div>
    );
  }
}

ObjectComponent.propTypes = propTypes;
ObjectComponent.recieveMRFData = true;

MRF.ObjectComponent = ObjectComponent;
MRF.Object = ObjectComponent;
