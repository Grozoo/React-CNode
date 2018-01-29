import React, { Component } from 'react';
import { Header, Footer, TopicLists } from '../components/index';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'all',
      page: 1,
      status: false,
      loading: false,
      error: null
    };
  }
  componentDidMount() {
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
      })
      .catch(e => this.setState({ error: e }));
  }
  onScrollHandle = event => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    if (scrollTop + clientHeight === scrollHeight) {
      this.setState({ loading: true });
      fetch(
        `https://cnodejs.org/api/v1/topics?tab=${this.props.location.search.slice(
          5
        )}&page=${this.state.page}`
      )
        .then(response => response.json())
        .then(json => {
          if (json.data.length === 0) {
            console.log('over');
          }
          this.setState(prevState => {
            return {
              contents: prevState.contents.concat(json.data),
              page: prevState.page + 1,
              loading: false
            };
          });
        })
        .catch(e => this.setState({ error: e }));
    }
  };
  componentWillReceiveProps(nextProps) {
    //切换tab后抓取新数据
    this.setState({ status: false });
    fetch(
      `https://cnodejs.org/api/v1/topics?tab=${nextProps.location.search.slice(
        5
      )}`
    )
      .then(response => response.json())
      .then(json => {
        this.scroll.scrollTop = 0;
        this.setState({ contents: json.data, status: true });
      })
      .catch(e => this.setState({ error: e }));
  }
  render() {
    const wait = '正在加载中···';
    if (error) {
      return <p>Something went wrong.</p>;
    }
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
          {this.state.status ? (
            <TopicLists list={this.state.contents} />
          ) : (
            <h1 className="wait">{wait}</h1>
          )}
          {this.state.loading ? <h1 className="loading">{wait}</h1> : null}
        </div>
        <Footer />
      </div>
    );
  }
}
export default HomePage;
