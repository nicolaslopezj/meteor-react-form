import { React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

import {
  TextField,
}  from 'material-ui';

export default class NComponent extends MRF.FieldType {
  constructor(props) {
    super(props);
    this.state = {
      value: this.formatValue(props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: this.formatValue(nextProps.value),
      });
    }
  }

  unformatValue(label) {
    return label === '' ? undefined : numeral().unformat(label);
  }

  formatValue(real) {
    return _.isNumber(real) ? numeral(real).format('$0,0[.]00') : '';
  }

  onBlur(event) {
    var value = event.target.value;
    this.props.onChange(this.unformatValue(value));
  }

  render() {
    return (
      <div>
        <TextField
          ref="input"
          fullWidth={true}
          value={this.state.value}
          floatingLabelText={this.props.label}
          errorText={this.props.errorMessage}
          onChange={(event) => this.setState({ value: event.target.value })}
          onBlur={this.onBlur.bind(this)}
          onEnterKeyDown={this.onBlur.bind(this)} />
      </div>
    );
  }
}
