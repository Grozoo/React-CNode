import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserAction } from '../index';

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      status: false
    };
  }
  componentWillMount() {
    fetch(`https://cnodejs.org/api/v1/${this.props.location.pathname}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.data, status: true });
        document.title = json.data.title;
      });
  }
  render() {
    const wait = '正在加载中···';
    const noReplies = '(＃°Д°)还没有没有回复哦~~';
    return (
      <div>
        <div className="nav topic_nav">
          <span onClick={() => this.props.history.goBack()}>返回</span>
          <span>
            <Link to={`${this.props.location.pathname}/edit`}>编辑</Link>
          </span>
        </div>

        {this.state.status ? (
          <section className="topic">
            <div className="section_header">
              <h2>{this.state.data.title}</h2>
              <span>{this.state.data.author.loginname}</span>
              <span>
                发表于{moment(`${this.state.data.create_at}`).fromNow()}{' '}
              </span>
              <span>{this.state.data.visit_count}次观看</span>
            </div>
            <div
              className="topic_contents"
              dangerouslySetInnerHTML={{ __html: this.state.data.content }}
            />

            <div className="reply">
              {this.state.data.replies.length ? (
                <div>
                  {this.state.data.replies.map((item, index) => (
                    <div key={index} className="replies_list">
                      <img
                        className="avatar_url"
                        src={item.author.avatar_url}
                        alt="avatar"
                      />
                      <Link to={`/user/${item.author.loginname}`}>
                        {item.author.loginname}{' '}
                      </Link>
                      <UserAction
                        replyId={item.id}
                        ups={item.ups}
                        tipcId={this.props.location.pathname}
                      />
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  ))}
                </div>
              ) : (
                <h1>{noReplies}</h1>
              )}
            </div>
          </section>
        ) : (
          <h1 className="wait">{wait}</h1>
        )}
      </div>
    );
  }
}
export default Topic;
