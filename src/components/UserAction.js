import React, { Component } from 'react';
import axios from 'axios';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import { message } from 'antd';

class UpReply extends Component {
  constructor() {
    super();
    this.state = {
      ups: 0,
      up: false,
      content: '',
      display: 'none'
    };
  }
  componentWillMount() {
    this.setState({
      ups: this.props.ups.length
    });
  }
  up = () => {
    if (!localStorage.token) {
      message.warning('你还没有登陆哦~~');
      return;
    }
    axios
      .post(`/reply/${this.props.replyId}/ups`, {
        accesstoken: localStorage.token
      })
      .then(res => {
        if (res.data.action === 'up') {
          this.setState(prevState => ({
            ups: prevState.ups + 1,
            up: !prevState.up
          }));
        } else if (res.data.action === 'down') {
          this.setState(prevState => ({
            ups: prevState.ups - 1,
            up: !prevState.up
          }));
        } else {
          message.warning('出错了XD');
        }
      });
  };
  write = e => {
    this.setState({ content: e.target.value });
  };
  replyShow = () => {
    if (!localStorage.token) {
      message.warning('你还没有登陆哦~~');
      return;
    }
    this.setState({ display: 'block' });
  };
  reply = () => {
    axios
      .post(`${this.props.tipcId}/replies`, {
        accesstoken: localStorage.token,
        content: this.state.content,
        reply_id: this.props.replyId
      })
      .then(res => {
        console.log(res);
      });
  };
  render() {
    console.log(this.props);
    return (
      <div className="user_action">
        <span onClick={this.up} style={{ padding: '0 4px ' }}>
          {this.state.up ? <FaThumbsUp /> : <FaThumbsOUp />}
          {this.state.ups || null}
        </span>
        <span onClick={this.replyShow} style={{ padding: ' 0 4px' }}>
          <FaMailReply />
        </span>
        <div style={{ display: this.state.display }}>
          <textarea onChange={this.write} />
          <button onClick={this.reply}>回复</button>
        </div>
      </div>
    );
  }
}

export default UpReply;
