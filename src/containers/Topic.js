import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Comment from '../components/Comment';

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      status: false
    };
  }
  componentDidMount() {
    fetch(`https://cnodejs.org/api/v1/${this.props.location.pathname}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.data, status: true });
        document.title = json.data.title;
      });
  }
  render() {
    const wait = '正在加载中···';
    return (
      <div>
        <div className="nav topic_nav">
          <span onClick={() => this.props.history.goBack()}>返回</span>
          <span>
            <Link to={`${this.props.location.pathname}/edit`}>编辑</Link>
          </span>
        </div>;
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
            <Comment comment={this.state.data.replies} />
          </section>
        ) : (
          <h1 className="wait">{wait}</h1>
        )};
      </div>
    );
  }
}
export default Topic;
