import { MUI, React } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  RaisedButton,
  Styles,
  LinearProgress,
  Paper,
} = MUI;

var {
  Colors,
} = Styles;

export const styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  preview: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
  },
  imageContainer: {
    marginBottom: 10,
    display: 'inline-block',
  },
  progress: {
    backgroundColor: Colors.grey100,
    marginTop: 20,
    maxWidth: 300,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: Colors.red500,
  },
};

export class ImageComponent extends MRF.FieldType {

  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      isUploading: false,
      progress: 0,
    };
    this.toDelete = [];
    this.limbo = null;

    $(window).unload(() => {
      this.componentWillUnmount();
    });
  }

  onSuccess() {
    this.toDelete.map((file) => {
      this.mrf.delete({
        file: file,
        onReady: () => {

        },

        onError: (message) => {
          alert(message);
        },
      });
    });
    this.toDelete = [];
    this.limbo = null;
  }

  componentWillUnmount() {
    if (!this.limbo) return true;
    this.mrf.delete({
      file: this.limbo,
      onReady: () => {

      },

      onError: (message) => {
        alert(message);
      },
    });
    return true;
  }

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        imageData: upload.target.result,
      });
    };

    reader.readAsDataURL(file);

    this.uploadFile(e.target.files);
  }

  uploadFile(file) {
    this.setState({ isUploading: true });

    this.mrf.upload({
      file: file,
      onProgress: (progress) => {
        this.setState({ progress });
      },

      onReady: ({ url, meta }) => {
        this.props.onChange({ url, meta });
        this.limbo = { url, meta };
        this.setState({ isUploading: false, imageData: null });
      },

      onError: (message) => {
        alert(message);
        this.setState({ isUploading: false, imageData: null });
      },
    });
  }

  handleDelete() {
    this.toDelete.push(_.clone(this.props.value));
    this.props.onChange(null);
  }

  renderPreview() {
    if (!this.state.imageData && !this.props.value) return;
    var opacityStyles = this.state.isUploading ? { opacity: 0.5 } : { opacity: 1 };
    var src = this.props.value ? this.props.value.url : this.state.imageData;
    return (
      <div>
        <Paper style={styles.imageContainer}>
          <img src={src}  style={_.clone(_.extend(styles.preview, opacityStyles))}/>
        </Paper>
      </div>
    );
  }

  renderButton() {
    if (this.state.isUploading || this.props.value) return;
    return (
      <RaisedButton
        label="Upload image"
        {...this.passProps}>
        <input type="file" style={styles.imageInput} accept="image/*" onChange={this.handleFile.bind(this)} />
      </RaisedButton>
    );
  }

  renderDeleteButton() {
    if (!this.state.isUploading && !this.props.value) return;
    return (
      <RaisedButton onClick={this.handleDelete.bind(this)} label="Delete image" />
    );
  }

  renderProgress() {
    if (!this.state.isUploading) return;
    const mode = this.state.progress !== 0 ? 'determinate' : 'indeterminate';
    return <LinearProgress mode={mode} style={styles.progress} value={this.state.progress * 100} />;
  }

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div style={styles.label}>
          {this.props.label}
        </div>
        {this.renderPreview()}
        {this.renderDeleteButton()}
        {this.renderButton()}
        {this.renderProgress()}
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    );
  }
}

MRF.registerType({
  type: 'image',
  component: ImageComponent,
  allowedTypes: [Object],
  description: 'Image field.',
  optionsDefinition: {
    upload: Function,
    delete: Function,
  },
  optionsDescription: {
    upload: 'A function that recieves ```{ file, onProgress, onReady, onError }```. ```onProgress``` input is ```progress```, a number from 0 to 1. ```onReady``` inputs are ```{ url, meta }```, ```url``` is the url of the file, ```meta``` meta is a object with whatever you want. ```onError``` input is ```message```.',
    delete: 'A function that recieves ```{ file, onReady, onError }```. ```file``` is the information of the file (includes the meta from before). ```onReady``` is a function with no input. ```onError``` input is ```message```.',
  },
});
