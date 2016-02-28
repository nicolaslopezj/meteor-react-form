var {
  RaisedButton,
  Paper,
} = MUI;

class MaterialArray extends MRF.ArrayComponent {
  renderChildrenItem({ index, component }) {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {component}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <RaisedButton label="Remove" onTouchTap={() => this.removeItem(index)}/>
        </div>
      </Paper>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <RaisedButton label="Add" onTouchTap={() => this.addItem()}/>
        </div>
      </div>
    );
  }
}

//MRF.Array = MaterialArray;
MRF.Form.defaultProps.arrayComponent = MaterialArray;
