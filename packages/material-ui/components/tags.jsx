import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';
import styles from '../styles.jsx';

var {
  TextField,
} = MUI;

class StringArrayComponent extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.addItem();
    }
  }

  addItem() {
    if (!this.state.value) return;
    var value = (this.props.value || [])
    value.push(this.state.value);
    this.props.onChange(value);
    this.setState({ value: '' });
  }

  removeItem(value) {
    const newValue = _.without(this.props.value, value)
    this.props.onChange(newValue);
  }

  renderItems() {
    return (this.props.value || []).map((value, index) => {
      return (
        <div onClick={() => this.removeItem(value)} key={index} style={styles.tag}>
          {value}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <TextField
          ref='input'
          fullWidth={true}
          value={this.state.value}
          floatingLabelText={this.props.useHint ? null : this.props.label}
          hintText={this.props.useHint ? this.props.label : null}
          errorText={this.props.errorMessage}
          disabled={this.props.disabled}
          onChange={(event) => this.setState({ value: event.target.value })}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={this.addItem.bind(this)}
          {...this.passProps} />
        {this.renderItems()}
      </div>
    );
  }
}

MRF.registerType({
  type: 'string-array',
  component: StringArrayComponent,
  allowedTypes: [[String]],
});

MRF.registerType({
  type: 'tags',
  component: StringArrayComponent,
  allowedTypes: [[String]],
  description: 'Tags input',
});
