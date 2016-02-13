var {
  TextField,
} = MUI;

class TextFieldComponent extends MRF.FieldType {
  render() {
    var options = (this.props.fieldSchema && this.props.fieldSchema.mrf) || {};
    var type = options.type || this.type;
    return (
      <TextField
        ref="input"
        fullWidth={true}
        value={this.props.value}
        type={type}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)}
        {...this.getPassProps()}/>
    );
  }
}

MRF.registerAttribute({
  type: 'TextField',
  component: TextFieldComponent,
  schema: {
    type: String,
  },
  defaultOptions: {
    type: 'text',
  },
});

class StringFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'text';
  }
}

MRF.registerAttribute({
  type: 'String',
  component: StringFieldComponent,
  schema: {
    type: String,
  },
});

class NumberFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'number';
  }
}

MRF.registerAttribute({
  type: 'Number',
  component: NumberFieldComponent,
  schema: {
    type: String,
  },
});

class DateFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'date';
  }
}

MRF.registerAttribute({
  type: 'Date',
  component: DateFieldComponent,
  schema: {
    type: String,
  },
});
