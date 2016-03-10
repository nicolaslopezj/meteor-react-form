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

const propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  addLabel: React.PropTypes.string.isRequired,
  removeLabel: React.PropTypes.string.isRequired,
  parentClassName: React.PropTypes.string,
  childrenClassName: React.PropTypes.string,
}

const defaultProps = {
  childrenClassName: '',
  parentClassName: '',
  addLabel: 'Add',
  removeLabel: 'Remove',
}

class MaterialArray extends MRF.ArrayComponent {
  renderChildrenItem({ index, component }) {
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
        <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
          {component}
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            {this.renderRemoveButton(index)}
          </div>
        </Paper>
      </div>
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
        <div className={this.props.parentClassName}>
          {this.renderChildren()}
        </div>
        <div style={{ marginTop: 10 }}>
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

MaterialArray.propTypes = propTypes;
MaterialArray.defaultProps = defaultProps;

MRF.Form.defaultProps.arrayComponent = MaterialArray;
MRF.ArrayComponent = MaterialArray;
