var {
  Checkbox,
  Styles,
} = MUI;

var {
  Colors,
} = Styles;

class CheckboxComponent extends MRF.FieldType {
  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Checkbox
          checked={this.props.value}
          onCheck={() => this.props.onChange(!this.props.value)}
          errorText={this.props.errorMessage}
          label={this.props.label}
          {...this.getPassProps()}
        />
      <span style={{ color: Colors.red500 }}>{this.props.errorMessage}</span>
      </div>
    );
  }
}

MRF.registerAttribute({
  type: 'Checkbox',
  component: CheckboxComponent,
  schema: {
    type: Boolean,
  },
});

MRF.registerAttribute({
  type: 'Boolean',
  component: CheckboxComponent,
});
