import React, { Component } from 'react';

class User extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    fetch(`https://cnodejs.org/api/v1/${this.props.location.pathname}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json });
      });
  }

  render() {
    const allData = this.state.data.data;
    return (
      <div>
        {this.state.data ? (
          <div className="user">
            <img src={allData.avatar_url} alt={allData.loginname} />
            <div className="user_details">
              <span>用户名：{allData.loginname}</span>
              <span>注册时间：{allData.create_at}</span>
            </div>
            <div>
              最近创建的话题:{allData.recent_topics.map((item, index) => (
                <div className="recent_replies" key={index}>
                  {item.title}
                </div>
              ))}
            </div>
            <div>
              最近参与的话题:{allData.recent_replies.map((item, index) => (
                <div className="recent_replies" key={index}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}
export default User;
