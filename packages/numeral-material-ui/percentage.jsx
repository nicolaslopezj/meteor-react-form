var {
  TextField,
} = MUI;

MRF.Components.Percentage = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      realValue: this.props.value,
      value: this.formatValue(this.props.value),
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        realValue: nextProps.value,
        value: this.formatValue(nextProps.value),
      });
    }
  },

  unformatValue(label) {
    return label === '' ? undefined : numeral().unformat(label + '%');
  },

  formatValue(real) {
    return _.isNumber(real) ? numeral(real).format('0.[00]%') : '';
  },

  onBlur(event) {
    var value = event.target.value;
    this.setState({
      realValue: this.unformatValue(value),
      value: this.formatValue(this.unformatValue(value)),
    });
    this.props.onChange(this.unformatValue(value));
  },

  render: function() {
    return (
      <div>
        <TextField
          ref="input"
          fullWidth={true}
          value={this.state.value}
          floatingLabelText={this.props.label}
          errorText={this.props.errorMessage}
          onChange={(event) => this.setState({ value: event.target.value })}
          onBlur={this.onBlur}
          onEnterKeyDown={this.onBlur}  />
      </div>
    );
  },
});

MRF.registerAttribute({
  type: 'Percentage',
  component: MRF.Components.Percentage,
  schema: {
    type: Number,
    decimal: true,
  },
});
