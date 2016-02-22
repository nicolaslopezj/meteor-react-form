import MRF from 'meteor/nicolaslopezj:mrf';
import {
  ImageComponent,
  styles,
} from './image.jsx';

import {
  RaisedButton,
  Styles,
  LinearProgress,
  Paper,
} from 'material-ui';

export default class FileComponent extends ImageComponent {

  handleFile(e) {
    this.uploadFile(e.target.files);
  }

  renderPreview() {
    if (!this.props.value) return;
    return (
      <p>
        <a href={this.props.value.url} target="_blank">{this.props.value.url}</a>
      </p>
    );
  }

  renderButton() {
    if (this.state.isUploading || this.props.value) return;
    return (
      <RaisedButton
        label="Upload file"
        {...this.passProps}>
        <input type="file" style={styles.imageInput} onChange={this.handleFile.bind(this)} />
      </RaisedButton>
    );
  }

  renderDeleteButton() {
    if (!this.props.value) return;
    return (
      <RaisedButton onClick={this.handleDelete.bind(this)} label="Delete file" />
    );
  }
};

MRF.registerType({
  type: 'file',
  component: FileComponent,
  allowedTypes: [Object],
  description: 'File field.',
  optionsDefinition: {
    upload: Function,
    delete: Function,
  },
  optionsDescription: {
    upload: 'Same as image attribute.',
    delete: 'Same as image attribute.',
  },
});
