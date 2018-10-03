import React from 'react';
import FileInput from 'components/FileInput';
import Container from 'components/Container';
import FitParser from 'lib/FitParser';
import { inject } from 'mobx-react';

@inject('menuStore', 'filesStore')
class Upload extends React.Component {
  state = {
    loading: false,
    error: ''
  };

  handleChange = files => {
    this.setState({ loading: true });
    const parsers = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      parsers.push(new FitParser().parse(file).then(laps => ({ laps, file })));
    }
    Promise.all(parsers)
      .then(data => {
        this.setState({ loading: false });
        this.props.menuStore.addLaps();
        this.props.menuStore.addGraph();
        data.forEach(({ file, laps }) => {
          this.props.filesStore.addFile(file.name, laps);
        });
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
    return null;
  }

  render() {
    return (
      <Container>
        <h1 className="mt-5">Upload Activity</h1>
        <p className="lead">Choose activity with laps of Test Conconi.</p>
        {this.renderInput()}
        <FileInput accept=".fit" onChange={this.handleChange} />
      </Container>
    );
  }
}

export default Upload;
