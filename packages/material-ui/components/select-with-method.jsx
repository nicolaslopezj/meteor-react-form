var {
  AutoComplete,
  MenuItem,
  Styles,
} = MUI;

var {
  Colors,
} = Styles;

class SelectWithMethodComponent extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selected: null,
      items: [],
      knownLabels: [],
      response: [],
      isCalling: false,
      hasTitleFor: null,
    };

    this.throttledSearch = _.throttle(this.search.bind(this), this.mrf.throttleTime || 200, { leading: false });
  }

  componentDidMount() {
    this.updateLabel(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateLabel(nextProps.value);
    }
  }

  updatedSelectedItems(values) {
    var missingLabels = [];
    var selectedItems = [];
    var knownLabels = this.state.knownLabels;
    var valueArray = _.isArray(values) ? values : [values];

    if (!values) return;

    valueArray.map((value) => {
      if (!this.state.knownLabels[value]) {
        missingLabels.push(value);
      }
    });

    if (missingLabels.length > 0) {
      var labelMethodName = this.mrf.labelMethodName;
      var connection = this.mrf.connection || Meteor;
      var labelsMethod = this.mrf.multi ? missingLabels : missingLabels[0];
      connection.call(labelMethodName, labelsMethod, (error, response) => {
        if (!error) {

          if (this.mrf.multi) {
            missingLabels.map((value, index) => {
              knownLabels[value] = response[index];
            });
          } else {
            knownLabels[labelsMethod] = response;
            this.refs.input.setState({ searchText: response });
          }

          this.setState({ knownLabels });
        }
      });
    } else {
      if (!this.mrf.multi) {
        this.refs.input.setState({ searchText: knownLabels[values] });
      }
    }
  }

  updateLabel(value) {
    if (!this.mrf.multi && !value) {
      this.refs.input.setState({ searchText: '' });
      return;
    }

    this.updatedSelectedItems(value);
  }

  search(text) {
    this.setState({ selected: null, isCalling: true });

    if (!this.mrf.multi) {
      this.props.onChange(null);
    }

    var methodName = this.props.fieldSchema.mrf.methodName;
    var connection = this.props.fieldSchema.mrf.connection || Meteor;
    connection.call(methodName, text, (error, response) => {
      this.setState({ response, isCalling: false });
      var dataSource = response.map((item) => {
        return {
          text: item.value,
          value: <MenuItem primaryText={item.label} />,
        };
      });

      this.setState({ dataSource });
    });
  }

  onUpdateText(text) {
    this.throttledSearch(text);
  }

  onItemSelected(item, index) {
    var selected = this.state.response[index];
    if (this.mrf.multi) {
      this.refs.input.setState({ searchText: '' });
      if (_.contains(this.props.value || [], selected.value)) return;
      this.props.onChange(_.union(this.props.value || [], [selected.value]));
    } else {
      this.props.onChange(selected.value);
    }

    this.state.knownLabels[selected.value] = selected.label;
    this.setState({ knownLabels: this.state.knownLabels });
  }

  removeItem(value) {
    this.props.onChange(_.without(this.props.value || [], value));
  }

  onBlur() {
    // this is not been called
    if (!this.props.value) {
      this.refs.input.setState({ searchText: '' });
    }
  }

  renderItems() {
    return (_.isArray(this.props.value) ? this.props.value : []).map((value, index) => {
      var label = this.state.knownLabels[value] || value;
      return (
        <div onClick={() => this.removeItem(value)} key={value} style={{ background: Colors.grey300, padding: '5px 10px', display: 'inline-block', borderRadius: 20, marginRight: 5, marginTop: 3, marginBottom: 2, cursor: 'pointer' }}>
          {label}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <AutoComplete
          ref="input"
          fullWidth={true}
          searchText=""
          dataSource={this.state.dataSource}
          filter={(searchText, key) => true}
          onUpdateInput={this.onUpdateText.bind(this)}
          floatingLabelText={this.props.label}
          onNewRequest={this.onItemSelected.bind(this)}
          errorText={this.props.errorMessage}
          {...this.passProps} />
        <div>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

MRF.registerType({
  type: 'select-with-method',
  component: SelectWithMethodComponent,
  allowedTypes: [String, Number, [String], [Number]],
  description: 'A select input that connects to a Meteor Method to fetch data.',
  optionsDefinition: {
    multi: Match.Optional(Boolean),
    methodName: String,
    labelMethodName: String,
    connection: Match.Optional(Match.Any),
    throttleTime: Match.Optional(Number),
  },
  optionsDescription: {
    multi: 'Allow to select multiple items',
    methodName: 'Meteor method that recieves the search string and returns an array of items with ```label``` and ```value```.',
    labelMethodName: 'Meteor method that recieves the value and must return the label. If ```multi``` is set to true, it will recieve an array and it must return an with the labels in the same order.',
    connection: 'A Meteor connection.',
    throttleTime: 'Minimum time between 2 calls to ```methodName```. Defaults to 200.',
  },
});
