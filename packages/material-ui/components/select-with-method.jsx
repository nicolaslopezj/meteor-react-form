var {
  AutoComplete,
  MenuItem,
} = MUI;

MRF.Components.SelectWithMethod = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    fieldSchema: React.PropTypes.object,
  },

  getInitialState() {
    return {
      dataSource: [],
      selected: null,
      response: [],
      searchText: '',
      isCalling: false,
    };
  },

  componentDidMount() {
    var labelMethodName = this.props.fieldSchema.mrfOptions.labelMethodName;
    var connection = this.props.fieldSchema.mrfOptions.connection || Meteor;
    connection.call(labelMethodName, this.props.value, (error, response) => {
      if (!error) {
        this.setState({ searchText: response });
      }
    });
  },

  onUpdateText(text) {
    if (this.state.isCalling) return;
    this.setState({ selected: null, isCalling: true });
    this.props.onChange(null);
    var methodName = this.props.fieldSchema.mrfOptions.methodName;
    var connection = this.props.fieldSchema.mrfOptions.connection || Meteor;
    connection.call(methodName, text, (error, response) => {
      this.setState({ response, isCalling: false });
      var dataSource = response.map((item) => {
        return {
          text: item.label,
          value: <MenuItem primaryText={item.label} />,
        };
      });

      this.setState({ dataSource });
    });
  },

  onItemSelected(item, index) {
    var selected = this.state.response[index];
    this.props.onChange(selected.value);
    this.setState({ selected });
  },

  render() {
    return (
      <AutoComplete
        ref="input"
        fullWidth={true}
        searchText={this.state.searchText}
        dataSource={this.state.dataSource}
        filter={(searchText, key) => true}
        onUpdateInput={this.onUpdateText}
        floatingLabelText={this.props.label}
        onNewRequest={this.onItemSelected}
        errorText={this.props.errorMessage} />
    );
  },
});
