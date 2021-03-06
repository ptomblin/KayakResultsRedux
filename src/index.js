import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fetchConfig } from './actions/configAction';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Start by fetching existing config
const store = configureStore();
store.dispatch(fetchConfig());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
