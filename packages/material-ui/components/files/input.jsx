import { MUI, React, ReactDOM } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';
import UploadButton from './upload-button.jsx';
import Preview from './preview.jsx';
import styles from '../../styles.jsx';

var {
  RaisedButton,
  Styles,
  LinearProgress,
  Paper,
} = MUI;

var {
  Colors,
} = Styles;

export default class Component extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = {};
    this.uploads = [];
  }

  onReady(upload, file) {
    if (this.mrf.multi) {
      var newValue = _.clone(this.props.value) || [];
      newValue.push(file);
      this.props.onChange(newValue);
    } else {
      this.props.onChange(file);
    }
  }

  startUpload(base64) {
    var upload = {
      key: _.uniqueId('uploadComponent'),
      base64,
      isUploading: true,
    };
    this.uploads.push(upload);
    this.forceUpdate();

    this.mrf.upload({
      base64,
      onProgress: (progress) => {
        upload.progress = progress;
        this.forceUpdate();
      },

      onReady: ({ url, meta }) => {
        this.onReady(upload, { url, meta });
        const index = this.uploads.indexOf(upload);
        this.uploads.splice(index, 1);
        this.forceUpdate();
      },

      onError: (message) => {
        this.onError(upload, message);
        upload.isUploading = false;
        upload.error = message;
        this.forceUpdate();
      },
    });
  }

  renderPreviews() {
    const uploadingPreviews = this.uploads.map((upload, index) => {
      return <Preview
        key={upload.key}
        base64={upload.base64}
        isUploading={upload.isUploading}
        progress={upload.progress}
        />
    });

    const value = this.mrf.multi ? (this.props.value || []) : this.props.value ? [this.props.value] : [];
    const previews = value.map((file, index) => {
      return <Preview
        key={`preview-${file.url}`}
        url={file.url}
        />
    });

    return (
      <div>
        {previews}
        {uploadingPreviews}
      </div>
    )
  }

  renderUploadButton() {
    const props = {
      accept: this.mrf.image ? 'image/*' : '',
      label: this.mrf.image ? 'Upload image' : 'Upload file',
      multi: !!this.mrf.multi,
      onUpload: this.startUpload.bind(this),
    };
    return <UploadButton {...props} />;
  }

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div style={styles.label}>
          {this.props.label}
        </div>
        {this.renderPreviews()}
        {this.renderUploadButton()}
        <div style={styles.errorMessage}>
          {this.props.errorMessage}
        </div>
      </div>
    )
  }
}

MRF.registerType({
  type: 'file',
  component: Component,
  allowedTypes: [Object, [Object]],
  description: 'File field.',
  optionsDefinition: {
    upload: Function,
    delete: Function,
    image: Match.Optional(Boolean),
    multi: Match.Optional(Boolean),
  },
  optionsDescription: {
    upload: 'A function that recieves ```{ file, onProgress, onReady, onError }```. ```onProgress``` input is ```progress```, a number from 0 to 1. ```onReady``` inputs are ```{ url, meta }```, ```url``` is the url of the file, ```meta``` meta is a object with whatever you want. ```onError``` input is ```message```.',
    delete: 'A function that recieves ```{ file, onReady, onError }```. ```file``` is the information of the file (includes the meta from before). ```onReady``` is a function with no input. ```onError``` input is ```message```.',
    image: 'Only accept images',
    multi: 'Accept multiple files. You must set ```[Object]``` to the type.',
  },
});
