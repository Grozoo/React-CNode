import React, { Component } from 'react';

class UpReply extends Component {
  constructor() {
    super();
    this.state = {
      ups: '',
      content: '',
      display: 'none'
    };
  }
  componentWillMount() {
    this.setState({
      sup: this.props.ups.length
    });
  }
  /*
   * error_msg:"您的账户被禁用"
   * 所以此处无法确定是否成功 =》理论上来说应该没错
   *
   */
  up = () => {
    if (!localStorage.token) {
      console.log('你还没有登陆哦~~');
      return;
    }
    fetch(`https://cnodejs.org/api/v1/reply/${this.props.replyId}/ups `, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accesstoken: localStorage.token
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  };
  write = e => {
    this.setState({ content: e.target.value });
  };
  replyShow = () => {
    if (!localStorage.token) {
      console.log('你还没有登陆哦~~');
      return;
    }
    this.setState({ display: 'block' });
  };
  reply = () => {
    fetch(`https://cnodejs.org/api/v1/${this.props.tipcId}/replies `, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accesstoken: localStorage.token,
        content: this.state.content,
        reply_id: this.props.replyId
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  };
  render() {
    return (
      <div className="user_action">
        <span onClick={this.up} className="up_btn">
          点赞{this.props.ups.length}
        </span>
        <span onClick={this.replyShow} className="reply_btn">
          回复
        </span>
        <div style={{ display: this.state.display }}>
          <textarea onChange={this.write} />
          <button onClick={this.reply}>aaaa</button>
        </div>
      </div>
    );
  }
}

export default UpReply;
