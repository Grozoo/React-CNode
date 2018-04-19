import React from 'react';
import ReactDom from 'react-dom';
import './style/index.css';
import axios from 'axios';
import Routes from './router';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';

ReactDom.render(
  <React.Fragment>
    <Routes />
  </React.Fragment>,
  document.getElementById('root')
);
