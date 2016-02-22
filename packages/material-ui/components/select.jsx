import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';
import styles from '../styles.jsx';

var {
  Styles,
  SelectField,
  MenuItem,
} = MUI;

var {
  Colors,
} = Styles;

class SelectComponent extends MRF.FieldType {

  renderItems() {
    return this.mrf.options.map((item) => {
      return <MenuItem key={item.value} value={item.value} primaryText={item.label} />;
    });
  }

  render() {
    return (
      <div style={styles.fieldContainer}>
        <div style={styles.label}>
          {this.props.label}
        </div>
        <SelectField
          value={this.props.value}
          onChange={(event, index, value) => this.props.onChange(value)}
          fullWidth={true}
          {...this.passProps}>
          {this.renderItems()}
        </SelectField>
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    );
  }
}

MRF.registerType({
  type: 'select',
  component: SelectComponent,
  allowedTypes: [String, Number],
  description: 'Simple select field.',
  optionsDefinition: {
    options: [{ label: String, value: Match.OneOf(String, Number) }],
  },
  optionsDescription: {
    options: 'The options for the select input. Each item must have ```label``` and ```value```.',
  },
});
