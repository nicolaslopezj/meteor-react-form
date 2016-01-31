MRF.Field = React.createClass({
  propTypes: {
    value: React.PropTypes.any,
    collection: React.PropTypes.object,
    errorMessage: React.PropTypes.string,
    fieldName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  onChange(value) {
    this.props.onChange(this.props.fieldName, value);
  },

  getFieldSchema() {
    return this.props.collection.simpleSchema().schema(this.props.fieldName);
  },

  getLabel() {
    return this.props.collection.simpleSchema().label(this.props.fieldName);
  },

  getComponent() {
    var component = MRF.getFieldComponent(this.getFieldSchema());
    return component && React.createElement(component, this.getProps());
  },

  getProps() {
    return {
      value: this.props.value,
      label: this.getLabel(),
      onChange: this.onChange,
      errorMessage: this.props.errorMessage,
      fieldSchema: this.getFieldSchema(),
    };
  },

  render: function() {
    return (
      <div>{this.getComponent()}</div>
    );
  },
});
