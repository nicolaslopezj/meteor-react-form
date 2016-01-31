var {
  Paper,
} = MUI;

MRF.Object = React.createClass({
  propTypes: {
    value: React.PropTypes.any,
    collection: React.PropTypes.object,
    errorMessage: React.PropTypes.string,
    errorMessages: React.PropTypes.object,
    fieldName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  getFieldSchema() {
    return this.props.collection.simpleSchema().schema(this.props.fieldName);
  },

  getLabel() {
    return this.props.collection.simpleSchema().label(this.props.fieldName);
  },

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child.type) {
        var fieldName = child.props.fieldName;
        return React.cloneElement(child, {
          fieldName: `${this.props.fieldName}.${fieldName}`,
          collection: this.props.collection,
          value: this.props.value ? this.props.value[fieldName] : undefined,
          onChange: this.props.onChange,
          errorMessage: this.props.errorMessages ? this.props.errorMessages[`${this.props.fieldName}.${fieldName}`] : undefined,
          errorMessages: this.props.errorMessages,
        });
      } else {
        return child;
      }
    });
  },

  render: function() {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
      </Paper>
    );
  },
});
