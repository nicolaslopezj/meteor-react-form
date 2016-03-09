import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  RaisedButton,
  Paper,
} = MUI;

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
          {this.renderRemoveButton(index)}
        </div>
      </Paper>
    );
  }

  renderRemoveButton(index) {
    if (this.props.disabled) return;
    return <RaisedButton label={this.props.removeLabel} onTouchTap={() => this.removeItem(index)}/>
  }

  renderAddButton() {
    if (this.props.disabled) return;
    return <RaisedButton label={this.props.addLabel} onTouchTap={() => this.addItem()}/>;
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div style={styles.label}>{this.getLabel()}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

MRF.Form.defaultProps.arrayComponent = MaterialArray;
MRF.ArrayComponent = MaterialArray;
