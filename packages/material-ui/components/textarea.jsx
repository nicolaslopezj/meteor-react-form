import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  TextField,
} = MUI;

class TextareaComponent extends MRF.FieldType {
  render() {
    return (
      <TextField
        ref='input'
        fullWidth={true}
        multiLine={true}
        rows={this.mrf.rows}
        value={this.props.value}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(event) => this.props.onChange(event.target.value)}
        {...this.passProps} />
    );
  }
}

MRF.registerType({
  type: 'textarea',
  component: TextareaComponent,
  allowedTypes: [String],
  description: 'Textarea',
  optionsDefinition: {
    rows: Match.Optional(Number),
  },
  optionsDescription: {
    rows: 'The number of rows',
  },
  defaultOptions: {
    rows: 2,
  },
});
