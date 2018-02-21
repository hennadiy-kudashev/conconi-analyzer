import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './pages/App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import stores from 'stores';

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
