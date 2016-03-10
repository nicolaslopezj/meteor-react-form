import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  DatePicker,
} = MUI;

class DatePickerComponent extends MRF.FieldType {

  render() {
    return (
      <DatePicker
        ref='input'
        fullWidth={true}
        value={this.props.value}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(_, date) => this.props.onChange(date)}
        {...this.passProps} />
    );
  }
}

MRF.registerType({
  type: 'date-picker',
  component: DatePickerComponent,
  allowedTypes: [Date],
  description: 'Material UI Date picker.',
  optionsDefinition: {
    minDate: Match.Optional(Date),
    maxDate: Match.Optional(Date),
    formatDate: Match.Optional(Function),
  },
  optionsDescription: {
    minDate: 'Minimum date for the picker.',
    maxDate: 'Maximum date for the picker.',
    formatDate: 'Takes the date as a parameters and must return a string.',
  },
});
