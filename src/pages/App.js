import React, { Component } from 'react';
import Layout from './Layout';
import Upload from './Upload';
import Laps from './Laps';

class App extends Component {
  render() {
    return (
      <Layout>
        <Upload />
        <Laps />
      </Layout>
    );
  }
}

export default App;
