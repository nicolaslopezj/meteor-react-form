var {
  AutoComplete,
  MenuItem,
} = MUI;

class SelectWithMethodComponent extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selected: null,
      response: [],
      searchText: '',
      isCalling: false,
    };
  }

  componentDidMount() {
    var labelMethodName = this.props.fieldSchema.mrf.labelMethodName;
    var connection = this.props.fieldSchema.mrf.connection || Meteor;
    connection.call(labelMethodName, this.props.value, (error, response) => {
      if (!error) {
        this.setState({ searchText: response });
      }
    });
  }

  onUpdateText(text) {
    if (this.state.isCalling) return;
    this.setState({ selected: null, isCalling: true });
    this.props.onChange(null);
    var methodName = this.props.fieldSchema.mrf.methodName;
    var connection = this.props.fieldSchema.mrf.connection || Meteor;
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
  }

  onItemSelected(item, index) {
    var selected = this.state.response[index];
    this.props.onChange(selected.value);
    this.setState({ selected });
  }

  render() {
    return (
      <AutoComplete
        ref="input"
        fullWidth={true}
        searchText={this.state.searchText}
        dataSource={this.state.dataSource}
        filter={(searchText, key) => true}
        onUpdateInput={this.onUpdateText.bind(this)}
        floatingLabelText={this.props.label}
        onNewRequest={this.onItemSelected.bind(this)}
        errorText={this.props.errorMessage} />
    );
  }
}

MRF.registerAttribute({
  type: 'SelectWithMethod',
  component: SelectWithMethodComponent,
});
