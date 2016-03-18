import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  TextField,
} = MUI;

class TextFieldComponent extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    var type = this.mrf.type || this.type;
    return (
      <TextField
        ref='input'
        fullWidth={true}
        value={this.state.value}
        type={type}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(event) => this.setState({ value: event.target.value })}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={() => this.props.onChange(this.state.value)}
        {...this.passProps} />
    );
  }
}

MRF.registerType({
  type: 'text',
  component: TextFieldComponent,
  description: 'Simple checkbox field.',
  optionsDefinition: {
    type: Match.Optional(String),
  },
  optionsDescription: {
    type: 'Input type, it can be email, password, etc.',
  },
});

class StringFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'text';
  }
}

MRF.registerType({
  type: 'string',
  component: StringFieldComponent,
});

class NumberFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'number';
  }
}

MRF.registerType({
  type: 'number',
  component: NumberFieldComponent,
});

class DateFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'date';
  }
}

MRF.registerType({
  type: 'date',
  component: DateFieldComponent,
});
