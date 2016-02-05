var {
  DatePicker,
} = MUI;

class DatePickerComponent extends MRF.FieldType {
  render() {
    return (
      <DatePicker
        ref="input"
        fullWidth={true}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(nothing, date) => this.props.onChange(date)} />
    );
  }
}

MRF.registerAttribute({
  type: 'DatePicker',
  component: DatePickerComponent,
  schema: {
    type: Date,
  },
});
