import { React } from 'meteor/npmdeps';

const propTypes = {
  /**
   * The current value of the field
   */
  value: React.PropTypes.any,

  /**
   * Field label
   */
  label: React.PropTypes.string,

  /**
   * The error message if there is a error
   */
  errorMessage: React.PropTypes.string,

  /**
   * Call this function when the value changes
   */
  onChange: React.PropTypes.func.isRequired,

  /**
   * If the input is disabled
   */
  disabled: React.PropTypes.bool,

  /**
   * The schema for the field
   */
  fieldSchema: React.PropTypes.object,

  /**
   * The schema for the object
   */
  schema: React.PropTypes.object,

  /**
   * Use hint instead of label
   */
  useHint: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,
};

export default class FieldType extends React.Component {

  constructor(props) {
    super(props);
    this.mrf = props.mrf;
    this.registerComponent();
  }

  componentWillReceiveProps(nextProps) {
    this.mrf = nextProps.mrf;
  }

  registerComponent() {
    this.props.form.registerComponent({
      field: this.props.fieldName,
      component: this,
    });
  }

}

FieldType.propTypes = propTypes;
