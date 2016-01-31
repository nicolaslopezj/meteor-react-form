var {
  DatePicker,
} = MUI;

MRF.Components.Date = React.createClass({
  propTypes: {
    value: React.PropTypes.instanceOf(Date),
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
      <DatePicker
        ref="input"
        fullWidth={true}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(nothing, date) => this.props.onChange(date)} />
    );
  },
});
