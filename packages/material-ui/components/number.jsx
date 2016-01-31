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

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  },

  render: function() {
    return (
      <TextField
        ref="input"
        fullWidth={true}
        value={this.state.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.setState({ value: event.target.value })}
        onBlur={() => this.props.onChange(this.state.value)}
        onEnterKeyDown={() => this.props.onChange(this.state.value)} />
    );
  },
});
