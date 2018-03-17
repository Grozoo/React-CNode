import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://cnodejs.org/api/v1/',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

export default Axios;
