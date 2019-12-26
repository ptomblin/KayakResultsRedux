import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { pouchFetchConfig } from './actions/pouchAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// Start by fetching existing config
const store = configureStore();
store.dispatch(pouchFetchConfig());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
