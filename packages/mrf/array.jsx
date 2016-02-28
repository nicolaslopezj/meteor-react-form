class ArrayComponent extends MRF.ObjectComponent {
  onValueChange(fieldName, newValue) {
    var withoutSelf = fieldName.replace(`${this.props.fieldName}.`, '');
    var index = withoutSelf.split('.')[0];
    var plainFieldName = withoutSelf.replace(`${index}.`, '');

    if (!this.props.value[index]) {
      this.props.value[index] = {};
    }

    this.props.value[index][plainFieldName] = newValue;
    this.props.onChange(this.props.fieldName, this.props.value);
  }

  addItem() {
    var newArray = this.props.value;
    if (_.isArray(newArray)) {
      newArray.push({});
    } else {
      newArray = [{}];
    }

    this.props.onChange(this.props.fieldName, newArray);
  }

  removeItem(index) {
    var newArray = _.without(this.props.value, this.props.value[index]);
    this.props.onChange(this.props.fieldName, newArray);
  }

  renderChildren() {
    var value = this.props.value || [];
    return value.map((item, index) => {
      var component = React.Children.map(this.props.children, (child) => {
        var fieldName = child.props.fieldName;
        var options = {};
        if (child.type.recieveMRFData) {
          options = {
            fieldName: `${this.props.fieldName}.${index}.${fieldName}`,
            collection: this.props.collection,
            value: this.props.value[index] ? this.props.value[index][fieldName] : undefined,
            onChange: this.onValueChange.bind(this),
            errorMessage: this.props.errorMessages ? this.props.errorMessages[`${this.props.fieldName}.${index}.${fieldName}`] : undefined,
            errorMessages: this.props.errorMessages,
          };
        } else {
          options = {
            children: this.renderChildren(child.props.children),
          };
        }

        return React.cloneElement(child, options);
      });
      return this.renderChildrenItem({ index, component });
    });
  }

  renderChildrenItem({ index, component }) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {component}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <button onClick={() => this.removeItem(index)}>
            Remove
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <button onClick={this.addItem.bind(this)}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

MRF.ArrayComponent = ArrayComponent;
MRF.Array = ArrayComponent;
