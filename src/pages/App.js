import React, { Component } from 'react';
import About from './About';
import Layout from './Layout';
import Upload from './Upload';
import Laps from './Laps';
import { inject, observer } from 'mobx-react';

@inject('menuStore')
@observer
class App extends Component {
  render() {
    return (
      <Layout>
        <About />
        <Upload />
        {this.props.menuStore.hasLaps() ? <Laps /> : null}
      </Layout>
    );
  }
}

export default App;
