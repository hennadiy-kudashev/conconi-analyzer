import React, { Component } from 'react';
import About from './About';
import Layout from './Layout';
import Upload from './Upload';
import Laps from './Laps';
import Graph from './Graph';
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
        {this.props.menuStore.hasGraph() ? <Graph /> : null}
      </Layout>
    );
  }
}

export default App;
