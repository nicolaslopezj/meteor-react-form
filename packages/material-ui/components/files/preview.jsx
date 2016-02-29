import { MUI, React, ReactDOM } from 'meteor/npmdeps';
import MRF from 'meteor/nicolaslopezj:mrf';

var {
  Styles,
  Paper,
  CircularProgress,
} = MUI;

var {
  Colors,
} = Styles;

const styles = {
  container: {
    marginBottom: 10,
    marginRight: 10,
    display: 'inline-block',
  },
  image: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
  },
  imageLoading: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
    opacity: 0.5,
  },
  progress: {
    margin: '0 auto',
    display: 'block',
    marginTop: -50,
  },
}

const propTypes = {
  base64: React.PropTypes.string,
  url: React.PropTypes.string,
  isUploading: React.PropTypes.bool,
  progress: React.PropTypes.number,
  onDelete: React.PropTypes.func,
};

export default class Component extends React.Component {

  renderBase64() {
    return (
      <Paper style={styles.container}>
        <img src={this.props.base64} style={styles.imageLoading}/>
        <CircularProgress style={styles.progress} mode='determinate' value={this.props.progress * 100} size={0.5} />
      </Paper>
    );
  }

  renderPreview() {
    return (
      <Paper style={styles.container}>
        <img src={this.props.url} style={styles.image}/>
      </Paper>
    );
  }

  render() {
    if (this.props.base64) {
      return this.renderBase64();
    } else {
      return this.renderPreview();
    }
  }

}

Component.propTypes = propTypes;
