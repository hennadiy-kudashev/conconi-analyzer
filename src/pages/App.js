import React, { Component } from 'react';
import Layout from './Layout';
import { inject, observer } from 'mobx-react';

@inject('menuStore')
@observer
class App extends Component {
  render() {
    return (
      <Layout>
        {this.props.menuStore.getItems().map(({ id, component: C }) => (
          <div key={id} id={id}>
            <C />
          </div>
        ))}
      </Layout>
    );
  }
}

export default App;
