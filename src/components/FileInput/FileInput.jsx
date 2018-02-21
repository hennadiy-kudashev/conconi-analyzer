import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: `Choose ${props.accept} file`
    };
  }

  handleChange = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.setState({ label: file.name });
      this.props.onChange(file);
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
