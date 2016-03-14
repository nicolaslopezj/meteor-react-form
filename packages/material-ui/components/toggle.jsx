import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  Toggle,
} = MUI;

class ToggleComponent extends MRF.FieldType {

  render() {
    return (
      <div>
        <Toggle
          label={this.props.label}
          fullWidth={true}
          defaultToggled={!!this.props.value}
          disabled={this.props.disabled}
          onToggle={() => this.props.onChange(!this.props.value)}
          {...this.passProps}/>
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    );
  }
}

MRF.registerType({
  type: 'toggle',
  component: ToggleComponent,
  allowedTypes: Boolean,
  description: 'Material UI toggle.',
});
