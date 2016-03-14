import { React } from 'meteor/npmdeps';
import {
  getFieldType,
  getFieldComponent
} from './types.jsx';

const propTypes = {
  /**
   * The value of the field.
   */
  value: React.PropTypes.any,

  /**
   * The simple schema
   */
  schema: React.PropTypes.object,

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

  /**
   * Should show label
   */
  showLabel: React.PropTypes.bool,

  /**
   * Use hint instead of label
   */
  useHint: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,

  /**
   * The type of the input
   */
  type: React.PropTypes.string,
};

const defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false,
};

export default class Field extends React.Component {

  onChange(value) {
    this.props.onChange(this.props.fieldName, value);
  }

  getSchema() {
    return this.props.schema;
  }

  getFieldSchema() {
    return this.getSchema() ? this.getSchema().schema(this.props.fieldName) : null;
  }

  getLabel() {
    if (this.props.label) {
      return this.props.label;
    } else {
      return this.getSchema().label(this.props.fieldName);
    }
  }

  getComponent() {
    var component = null;
    if (this.props.type) {
      component = getFieldType(this.props.type).component;
    } else {
      component = getFieldComponent({
        fieldName: this.props.fieldName,
        schema: this.getSchema(),
      });
    }

    return React.createElement(component, this.getChildProps());
  }

  getChildProps() {
    return {
      value: this.props.value,
      label: this.props.showLabel ? this.getLabel() : null,
      useHint: this.props.useHint,
      onChange: this.onChange.bind(this),
      errorMessage: this.props.errorMessage,
      fieldSchema: this.getFieldSchema(),
      fieldName: this.props.fieldName,
      schema: this.getSchema(),
      form: this.props.form,
      disabled: this.props.disabled,
    };
  }

  render() {
    return (
      <div>{this.getComponent()}</div>
    );
  }
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
Field.recieveMRFData = true;
