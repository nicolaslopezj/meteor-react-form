import React from 'react';
import MRF from 'meteor/nicolaslopezj:mrf';
import NumeralFieldComponent from './numeral.jsx';
import numeral from 'numeral';

class MoneyComponent extends NumeralFieldComponent {
  unformatValue(label) {
    return label === '' ? undefined : numeral().unformat(label);
  }

  formatValue(real) {
    return _.isNumber(real) ? numeral(real).format('$0,0[.]00') : '';
  }
}

MRF.registerType({
  type: 'money',
  component: MoneyComponent,
});
