import { MUI, React, ReactDOM } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  Styles,
  RaisedButton,
} = MUI;

var {
  Colors,
} = Styles;

const propTypes = {
  accept: React.PropTypes.string,
  label: React.PropTypes.string,
  multi: React.PropTypes.bool,
  onUpload: React.PropTypes.func.isRequired,
};

const defaultProps = {
  label: 'Upload image',
  multi: false,
  accept: 'image/*',
};

export default class Component extends React.Component {

  openFileDialog() {
    var fileInputDom = ReactDOM.findDOMNode(this.refs.input);
    fileInputDom.click();
  }

  handleFile(event) {
    _.keys(event.target.files).map((index) => {
      const file = event.target.files[index];
      const reader = new FileReader();
      reader.onload = (upload) => {
        const base64 = upload.target.result;
        this.props.onUpload(base64);
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div>
        <RaisedButton
          label={this.props.label}
          onClick={this.openFileDialog.bind(this)} />
        <input
          type='file'
          multiple={this.props.multi}
          ref='input'
          style={{display: 'none'}}
          accept={this.props.accept}
          onChange={this.handleFile.bind(this)} />
      </div>
    );
  }

}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
