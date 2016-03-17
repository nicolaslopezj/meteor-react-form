import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  Checkbox,
  FontIcon,
  Styles,
} = MUI;

var {
  Colors,
} = Styles;

class CheckboxComponent extends MRF.FieldType {

  checkedIcon() {
    return <FontIcon className="material-icons">check_box</FontIcon>
  }

  unCheckedIcon() {
    return <FontIcon className="material-icons">check_box_outline_blank</FontIcon>
  }

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Checkbox
          label={this.props.label}
          disabled={this.props.disabled}
          checked={this.props.value}
          onCheck={() => this.props.onChange(!this.props.value)}
          checkedIcon={this.checkedIcon()}
          unCheckedIcon={this.unCheckedIcon()}
          {...this.passProps}
        />
        <span style={{ color: Colors.red500 }}>{this.props.errorMessage}</span>
      </div>
    );
  }
}

MRF.registerType({
  type: 'checkbox',
  component: CheckboxComponent,
  allowedTypes: [Boolean],
  description: 'Simple checkbox field.',
  optionsDefinition: {},
  optionsDescription: {},
});

MRF.registerType({
  type: 'boolean',
  component: CheckboxComponent,
});
