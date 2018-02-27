import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './router';
import './style/index.css';

import store from './store/';
import getData from './store/actions/getDataAction';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/**
 * 监听 state
 */
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));
