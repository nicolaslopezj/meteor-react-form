var {
  RaisedButton,
  Paper,
} = MUI;

MRF.Array = React.createClass({
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

  onValueChange(fieldName, newValue) {
    var withoutSelf = fieldName.replace(`${this.props.fieldName}.`, '');
    var index = withoutSelf.split('.')[0];
    var plainFieldName = withoutSelf.replace(`${index}.`, '');

    this.props.value[index][plainFieldName] = newValue;
    this.props.onChange(this.props.fieldName, this.props.value);
  },

  addItem() {
    var newArray = this.props.value;
    if (_.isArray(newArray)) {
      newArray.push({});
    } else {
      newArray = [{}];
    }

    this.props.onChange(this.props.fieldName, newArray);
  },

  removeItem(index) {
    var newArray = _.without(this.props.value, this.props.value[index]);
    this.props.onChange(this.props.fieldName, newArray);
  },

  renderChildren() {
    var value = this.props.value || [];
    return value.map((item, index) => {
      var component = React.Children.map(this.props.children, (child) => {
        var fieldName = child.props.fieldName;
        return React.cloneElement(child, {
          fieldName: `${this.props.fieldName}.${index}.${fieldName}`,
          collection: this.props.collection,
          value: this.props.value[index] ? this.props.value[index][fieldName] : undefined,
          onChange: this.onValueChange,
          errorMessage: this.props.errorMessages ? this.props.errorMessages[`${this.props.fieldName}.${index}.${fieldName}`] : undefined,
          errorMessages: this.props.errorMessages,
        });
      });
      return (
        <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
          {component}
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <RaisedButton label="Remove" onTouchTap={() => this.removeItem(index)}/>
          </div>
        </Paper>
      );
    });
  },

  render: function() {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <RaisedButton label="Add" onTouchTap={this.addItem}/>
        </div>
      </div>
    );
  },
});
