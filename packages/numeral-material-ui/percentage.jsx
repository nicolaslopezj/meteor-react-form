import { React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';
import NumeralFieldComponent from './numeral.jsx';

class PercentageComponent extends NumeralFieldComponent {
  unformatValue(label) {
    return label === '' ? undefined : numeral().unformat(label + '%');
  }

  formatValue(real) {
    return _.isNumber(real) ? numeral(real).format('0.[00]%') : '';
  }
}

MRF.registerType({
  type: 'percentage',
  component: PercentageComponent,
  allowedTypes: [Number],
  optionsDefinition: {
    fullNumber: Match.Optional(Boolean),
  },
  optionsDescription: {
    fullNumber: 'True to save values in numbers from 0 to 100',
  },
});
