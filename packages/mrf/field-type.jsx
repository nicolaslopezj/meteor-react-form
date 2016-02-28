const propTypes = {
  /**
   * The current value of the field
   */
  value: React.PropTypes.any,

  /**
   * Field label
   */
  label: React.PropTypes.string.isRequired,

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
  fieldSchema: React.PropTypes.object.isRequired,

  /**
   * The schema for the object
   */
  schema: React.PropTypes.object.isRequired,
};

class FieldType extends React.Component {

  constructor(props) {
    super(props);
    this.mrf = (this.props.fieldSchema && this.props.fieldSchema.mrf) || {};
    this.passProps = this.mrf.passProps || {};
  }

}

FieldType.propTypes = propTypes;

MRF.FieldType = FieldType;
