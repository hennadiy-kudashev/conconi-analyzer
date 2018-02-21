import React from 'react';
import FileInput from 'components/FileInput';
import Container from 'components/Container';
import FitParser from 'lib/FitParser';

class Upload extends React.Component {
  state = {
    loading: false,
    error: ''
  };

  handleChange = file => {
    this.setState({ loading: true });
    new FitParser()
      .parse(file)
      .then(data => {
        this.setState({ loading: false });
        console.log(data);
      })
      .catch(error => {
        this.setState({ loading: false, error: error });
      });
  };

  renderInput() {
    const { loading, error } = this.state;
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (loading) {
      return <div>loading...</div>;
    }
    return <FileInput accept=".fit" onChange={this.handleChange} />;
  }

  render() {
    return (
      <Container>
        <h1 className="mt-5">Upload Activity</h1>
        <p className="lead">Choose activity with laps of Test Conconi.</p>
        {this.renderInput()}
      </Container>
    );
  }
}

export default Upload;
