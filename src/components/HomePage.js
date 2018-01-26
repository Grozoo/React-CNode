import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Header, Footer } from '../index';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'all',
      page: 1,
      status: false,
      loading: false
    };
  }
  componentWillMount() {
    fetch(
      `https://cnodejs.org/api/v1/topics?tab=${this.props.location.search.slice(
        5
      )}&page=${this.state.page}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState(prevState => {
          return {
            contents: json.data,
            page: prevState.page + 1,
            status: true,
            loading: false
          };
        });
      });
  }
  onScrollHandle = event => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log(`滚呀滚 滚了一页啦~~, 现在是第${this.state.page}页哟 ❤`);
      this.setState({ loading: true });
      fetch(
        `https://cnodejs.org/api/v1/topics?tab=${this.props.location.search.slice(
          5
        )}&page=${this.state.page}`
      )
        .then(response => response.json())
        .then(json => {
          if (json.data.length === 0) {
            console.log(
              '别刷啦，😭已经没有更多帖子惹~~~共计581页(本项目创建之时)'
            );
          }
          this.setState(prevState => {
            return {
              contents: prevState.contents.concat(json.data),
              page: prevState.page + 1,
              loading: false
            };
          });
        });
    }
  };
  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ status: false });
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.search !== this.props.location.search) {
      fetch(
        `https://cnodejs.org/api/v1/topics?tab=${nextProps.location.search.slice(
          5
        )}`
      )
        .then(response => response.json())
        .then(json => {
          this.scroll.scrollTop = 0;
          this.setState({ contents: json.data, status: true });
        });
    }
  }
  render() {
    const wait = '正在加载中···';
    return (
      <div className="rootMain">
        <Header />
        <div
          className="main"
          onScroll={this.onScrollHandle}
          ref={node => {
            this.scroll = node;
          }}
        >
          <div className="topic_list">
            {this.state.status ? (
              this.state.contents.map((contents, key) => (
                <div key={key} className="list">
                  <Link to={`/user/${contents.author.loginname}`}>
                    <img
                      alt="avatar_url"
                      className="avatar_url"
                      src={contents.author.avatar_url}
                    />
                  </Link>
                  <Link to={`/topic/${contents.id}`}>
                    <h3>{contents.title}</h3>
                    <div>
                      <span>{contents.author.loginname}</span>
                      <span>
                        · 发表于:{moment(`${contents.create_at}`).fromNow()}
                      </span>
                      <span>· reply:{contents.reply_count}</span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <h1 className="wait">{wait}</h1>
            )}
            {this.state.loading ? <h1 className="loading">{wait}</h1> : null}
          </div>
        </div>
        {<Footer />}
      </div>
    );
  }
}
export default HomePage;
