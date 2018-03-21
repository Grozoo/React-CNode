import React from 'react';
import ReactDom from 'react-dom';
import Routes from './router';
import './style/index.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';

ReactDom.render(<Routes />, document.getElementById('root'));
