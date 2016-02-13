var {
  TextField,
} = MUI;

class TextareaComponent extends MRF.FieldType {
  render() {
    return (
      <TextField
        ref="input"
        fullWidth={true}
        multiLine={true}
        rows={2}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)}
        {...this.getPassProps()} />
    );
  }
}

MRF.registerAttribute({
  type: 'Textarea',
  component: TextareaComponent,
  schema: {
    type: String,
  },
});
