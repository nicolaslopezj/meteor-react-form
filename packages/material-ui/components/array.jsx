import MRF from 'meteor/nicolaslopezj:mrf';

import {
  RaisedButton,
  Paper,
} from 'material-ui';

const styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
};

class MaterialArray extends MRF.ArrayComponent {
  renderChildrenItem({ index, component }) {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {component}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <RaisedButton label={this.props.removeLabel} onTouchTap={() => this.removeItem(index)}/>
        </div>
      </Paper>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div style={styles.label}>{this.getLabel()}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <RaisedButton label={this.props.addLabel} onTouchTap={() => this.addItem()}/>
        </div>
      </div>
    );
  }
}

MRF.Form.defaultProps.arrayComponent = MaterialArray;
MRF.ArrayComponent = MaterialArray;
