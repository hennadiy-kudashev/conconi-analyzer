import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: `Choose ${props.accept} file(s)`
    };
  }

  handleChange = e => {
    if (e.target.files.length > 0) {
      const files = e.target.files;
      //this.setState({ label: file.name });
      this.props.onChange(files);
      //in order to upload the same file again
      e.target.value = '';
    } else {
      this.setState({ label: 'No files selected' });
    }
  };

  render() {
    const { accept } = this.props;
    return (
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile03"
          accept={accept}
          multiple
          onChange={this.handleChange}
        />
        <label className="custom-file-label" htmlFor="inputGroupFile03">
          {this.state.label}
        </label>
      </div>
    );
  }
}

export default FileInput;
