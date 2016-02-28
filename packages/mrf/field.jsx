import { React } from 'meteor/npmdeps';

const propTypes = {
  /**
   * The value of the field.
   */
  value: React.PropTypes.any,

  /**
   * Mongo Collection.
   */
  collection: React.PropTypes.object,

  /**
   * Error message if there is a error.
   */
  errorMessage: React.PropTypes.string,

  /**
   * The name of the field in the object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: React.PropTypes.func,
};

export default class Field extends React.Component {

  onChange(value) {
    this.props.onChange(this.props.fieldName, value);
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

  getComponent() {
    var component = MRF.getFieldComponent(this.getFieldSchema(), this.props.fieldName);
    return component && React.createElement(component, this.getChildProps());
  }

  getChildProps() {
    return {
      value: this.props.value,
      label: this.getLabel(),
      onChange: this.onChange.bind(this),
      errorMessage: this.props.errorMessage,
      fieldSchema: this.getFieldSchema(),
      fieldName: this.props.fieldName,
      schema: this.getSchema(),
      form: this.props.form,
    };
  }

  render() {
    return (
      <div>{this.getComponent()}</div>
    );
  }
};

Field.propTypes = propTypes;
Field.recieveMRFData = true;
