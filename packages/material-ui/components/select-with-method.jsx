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
      hasTitleFor: null,
    };
  }

  componentDidMount() {
    this.updateLabel(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateLabel(nextProps.value);
    }
  }

  updateLabel(value) {
    if (!value) {
      this.setState({ searchText: '' });
      return;
    }

    if (this.state.selected && value == this.state.selected.value) {
      return;
    }

    var labelMethodName = this.props.fieldSchema.mrf.labelMethodName;
    var connection = this.props.fieldSchema.mrf.connection || Meteor;
    connection.call(labelMethodName, value, (error, response) => {
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

  onBlur() {
    // this is not been called
    if (!this.props.value) {
      this.setState({ searchText: '' });
    }
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
        errorText={this.props.errorMessage}
        onBlur={this.onBlur.bind(this)}
        {...this.getPassProps()} />
    );
  }
}

MRF.registerAttribute({
  type: 'SelectWithMethod',
  component: SelectWithMethodComponent,
});
