var {
  Paper,
} = MUI;

class MaterialObject extends MRF.ObjectComponent {
  render() {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
      </Paper>
    );
  }
}

//MRF.Object = MaterialObject;
MRF.Form.defaultProps.objectComponent = MaterialObject;
