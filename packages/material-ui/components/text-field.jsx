var {
  TextField,
} = MUI;

class TextFieldComponent extends MRF.FieldType {
  render() {
    var type = this.mrf.type || this.type;
    return (
      <TextField
        ref="input"
        fullWidth={true}
        value={this.props.value}
        type={type}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)}
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
