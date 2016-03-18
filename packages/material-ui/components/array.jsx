import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  RaisedButton,
  Paper,
  IconButton,
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
  useSmallSpace: React.PropTypes.bool,
}

const defaultProps = {
  childrenClassName: '',
  parentClassName: '',
  addLabel: 'Add',
  removeLabel: 'Remove',
  useSmallSpace: false,
}

class MaterialArray extends MRF.ArrayComponent {
  renderChildrenItem({ index, component }) {
    if (this.props.useSmallSpace) return this.renderChildrenSmallItem({ index, component });
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

  renderChildrenSmallItem({ index, component }) {
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`} style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
        <div style={{ flexBasis: '90%', maxWidth: '90%' }}>
          {component}
        </div>
        <div style={{ flexBasis: '10%', maxWidth: '10%', marginTop: 20, textAlign: 'right' }}>
          {this.renderSmallRemoveButton(index)}
        </div>
      </div>
    );
  }

  renderRemoveButton(index) {
    if (this.props.disabled) return;
    return <RaisedButton label={this.props.removeLabel} onTouchTap={() => this.removeItem(index)}/>
  }

  renderSmallRemoveButton(index) {
    if (this.props.disabled) return;
    return (
      <IconButton
        iconClassName="material-icons"
        onTouchTap={() => this.removeItem(index)}
        tooltip={this.props.removeLabel}
        >
        clear
      </IconButton>
    );
  }

  renderAddButton() {
    if (this.props.disabled) return;
    if (this.props.useSmallSpace) return this.renderSmallAddButton();
    return <RaisedButton label={this.props.addLabel} onTouchTap={() => this.addItem()}/>;
  }

  renderSmallAddButton() {
    return (
      <div style={{ textAlign: 'right' }}>
        <IconButton
          iconClassName="material-icons"
          onTouchTap={() => this.addItem()}
          tooltip={this.props.addLabel}
          >
          add
        </IconButton>
      </div>
    )
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
