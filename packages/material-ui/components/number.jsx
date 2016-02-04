var {
  TextField,
} = MUI;

MRF.Components.Number = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <TextField
        ref="input"
        fullWidth={true}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)} />
    );
  },
});
