import React, { Component } from 'react';
import { Footer } from '../../components/index';
//import Axios from '../../util/axios'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: ''
    };
  }
  componentWillMount() {
    alert('请登录');
  }
  handelChange = e => {
    this.setState({
      token: e.target.value
    });
  };
  handleSubmit = () => {
    const token = this.state.token;
    if (token === '') {
      //alert('你什么也没填哦(⊙o⊙)？');
    }
    /* Axios.post('accesstoken',{ token }).then(res=>{
      console.log('等待···')
    }) */
    fetch('https://cnodejs.org/api/v1/accesstoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accesstoken: this.state.token
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.token = this.state.token;
          let { pathname } = this.props.history.location.state.from;
          console.log(data);
          this.props.history.push(pathname);
        }
      })
      .catch(error => {
        console.log(error, '出错啦(●ˇ∀ˇ●)');
      });
  };
  render() {
    console.log(`Login`);
    return (
      <div>
        <header>
          <h2>登录</h2>
        </header>
        <div>
          <input
            placeholder="这里填上Access Token~~~"
            onChange={this.handelChange}
          />
          <button onClick={this.handleSubmit}>提交</button>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Login;
