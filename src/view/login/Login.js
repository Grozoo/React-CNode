import React, { Component } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Form, Icon, Input, Button } from 'antd';
import './login.css';

const FormItem = Form.Item;

class Login extends Component {
  componentWillMount() {
    message.warning('请登录');
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('accesstoken', { accesstoken: values.token })
          .then(res => {
            if (res.data.success) {
              localStorage.token = values.token;
              console.log('success');
              let pathname =
                this.props.history.location.state.from.pathname || '/';
              this.props.history.push(pathname);
              console.log('success');
            }
          })
          .catch(error => {
            message.warning('请检查你的token是否正确');
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('token', {
            rules: [{ required: true, message: 'Please input your token!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="token"
            />
          )}
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" href="https://cnodejs.org/setting">
            register now!
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(Login);
