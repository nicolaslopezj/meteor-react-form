var {
  Checkbox,
} = MUI;

MRF.Components.MultipleCheckbox = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    label: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    fieldSchema: React.PropTypes.object,
  },

  onCheck(value, currentVal) {
    var newVal = [];
    if (_.contains(currentVal, value)) {
      newVal = _.without(currentVal, value);
    } else {
      newVal = _.union(currentVal, [value]);
    }

    this.props.onChange(newVal);
  },

  renderOptions() {
    var currentVal = this.props.value || [];
    return this.props.fieldSchema.mrfOptions.options.map((option) => {
      return (
        <div key={option.value} style={{ marginTop: 10 }}>
          <Checkbox
            checked={_.contains(currentVal, option.value)}
            onCheck={() => this.onCheck(option.value, currentVal)}
            label={option.label}
          />
        </div>
      );
    });
  },

  render() {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderOptions()}
      </div>
    );
  },
});
