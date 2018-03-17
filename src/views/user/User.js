import React, { Component } from 'react';
import Axios from '../../util/axios';

class User extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    const id = this.props.location.pathname;
    Axios.get(id).then(res => {
      const data = res.data.data;
      this.setState({ data });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        {this.state.data ? (
          <div className="user">
            <img src={data.avatar_url} alt={data.loginname} />
            <div className="user_details">
              <span>用户名：{data.loginname}</span>
              <span>注册时间：{data.create_at}</span>
            </div>
            <div>
              最近创建的话题:{data.recent_topics.map((item, index) => (
                <div className="recent_replies" key={index}>
                  {item.title}
                </div>
              ))}
            </div>
            <div>
              最近参与的话题:{data.recent_replies.map((item, index) => (
                <div className="recent_replies" key={index}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span />
        )}
      </React.Fragment>
    );
  }
}
export default User;
