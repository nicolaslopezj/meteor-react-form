import React from 'react';
import MRF from 'meteor/nicolaslopezj:mrf';

import {
  Paper,
} from 'material-ui';

const styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
};

class MaterialObject extends MRF.ObjectComponent {
  render() {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div style={styles.label}>{this.getLabel()}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
      </Paper>
    );
  }
}

//MRF.Object = MaterialObject;
MRF.Form.defaultProps.objectComponent = MaterialObject;
MRF.ObjectComponent = MaterialObject;
