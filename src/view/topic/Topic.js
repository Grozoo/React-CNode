import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Comment from '../../component/comment/Comment';
import axios from 'axios';
import './topic.css';
import { Spin, message, Icon } from 'antd';

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      status: false
    };
  }
  componentDidMount() {
    const id = this.props.location.pathname;
    axios.get(id).then(res => {
      const data = res.data.data;
      this.setState({ data: data, status: true });
      document.title = data.title;
    });
  }
  replyTopic = () => {
    if (this.textArea.value === '') {
      message.warning('写点什么吧');
      return 0;
    }
    const topicId = this.props.location.pathname.slice(7);
    axios
      .post(`/topic/${topicId}/replies`, {
        accesstoken: localStorage.token,
        content: this.textArea.value
      })
      .then(res => {
        if (res.data.success) {
          message.success('回复成功');
          window.location.reload();
        }
      })
      .catch(_ => {
        message.error('error')
      })

  };
  render() {
    const topicId = this.props.location.pathname.slice(7);
    return (
      <React.Fragment>
        {this.state.status ? (
          <section className="topic">
            <div className="section_header">
              <h2>{this.state.data.title}</h2>
              <div className="topic-meta">
                <Link to={`/user/${this.state.data.author.loginname}`}>
                  <img
                    alt="author"
                    className="author"
                    src={this.state.data.author.avatar_url}
                  />
                </Link>
                <div
                  style={{ display: 'inline-block' }}
                  className="topic-description"
                >
                  <p>
                    <b>{this.state.data.author.loginname}</b>
                  </p>
                  <span>
                    {this.state.data.visit_count}次观看 · 发表于{moment(
                      `${this.state.data.create_at}`
                    ).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="topic_contents"
              dangerouslySetInnerHTML={{
                __html: this.state.data.content
              }}
            />
            <Comment comment={this.state.data.replies} topicId={topicId} />
            <div id="respond">
              <div className="respond-header">
                <h3>添加回复</h3>
              </div>
              <div className="text">
                <textarea
                  ref={textArea => {
                    this.textArea = textArea;
                  }}
                />
              </div>
              <input onClick={this.replyTopic} type="submit" value="回复" />
            </div>
          </section>
        ) : (
            <div className="loading">
              <Spin size="large" />
            </div>
          )};
          <footer className="topic_nav">
          <div onClick={() => this.props.history.goBack()}>
            <Icon type="left-circle" style={{ fontSize: 24, color: "rgb(0, 0, 0)" }} />
          </div>
          <div>
            <Icon type="exclamation-circle" style={{ fontSize: 24, color: "rgb(0, 0, 0)" }} />
            {/*为主人时显示，编辑*/}
            {/* <Link to={`${this.props.location.pathname}/edit`}>
              <Icon type="edit" style={{ fontSize: 24, color: "rgb(0, 0, 0)" }} />
            </Link> */}
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
export default Topic;
