var {
  Checkbox,
} = MUI;

class MultipleCheckboxComponent extends MRF.FieldType {
  onCheck(value, currentVal) {
    var newVal = [];
    if (_.contains(currentVal, value)) {
      newVal = _.without(currentVal, value);
    } else {
      newVal = _.union(currentVal, [value]);
    }

    this.props.onChange(newVal);
  }

  renderOptions() {
    var currentVal = this.props.value || [];
    return this.props.fieldSchema.mrf.options.map((option) => {
      return (
        <div key={option.value} style={{ marginTop: 10 }}>
          <Checkbox
            checked={_.contains(currentVal, option.value)}
            onCheck={() => this.onCheck(option.value, currentVal)}
            label={option.label}
            {...this.passProps}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderOptions()}
      </div>
    );
  }
}

MRF.registerType({
  type: 'multiple-checkbox',
  component: MultipleCheckboxComponent,
  allowedTypes: [[String], [Number]],
  description: 'Select multiple values with checkboxes.',
  optionsDefinition: {
    options: [{ label: String, value: Match.OneOf(String, Number) }],
  },
  optionsDescription: {
    options: 'The options for the checkbox. Each item must have ```label``` and ```value```.',
  },
});
