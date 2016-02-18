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
