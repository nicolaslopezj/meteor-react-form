import { MUI, React } from 'meteor/npmdeps';

var {
  Styles,
} = MUI;

var {
  Colors,
} = Styles;

export default styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
  mirrorLabel: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: -6,
    fontSize: 12,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: Colors.red500,
  },
  fieldContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
};
