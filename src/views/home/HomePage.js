import React, { Component } from 'react';
import { Header, Footer, TopicLists } from '../../components/index';
import Axios from '../../util/axios';

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
  componentDidMount() {
    const tab = this.props.location.search.slice(5);
    const page = this.state.page;
    Axios.get('/topics', {
      params: {
        tab,
        page
      }
    }).then(res => {
      const data = res.data.data;
      this.setState(prevState => ({
        contents: data,
        page: prevState.page + 1,
        status: true,
        loading: false
      }));
    });
  }
  onScrollHandle = event => {
    const tab = this.props.location.search.slice(5);
    const page = this.state.page;
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    if (scrollTop + clientHeight === scrollHeight) {
      this.setState({ loading: true });
      Axios.get('/topics', {
        params: {
          tab,
          page
        }
      }).then(res => {
        const data = res.data.data;
        this.setState(prevState => ({
          contents: prevState.contents.concat(data),
          page: prevState.page + 1,
          loading: false
        }));
      });
    }
  };
  componentWillReceiveProps(nextProps) {
    const tab = nextProps.location.search.slice(5);
    //切换tab后抓取新数据
    this.setState({ status: false });
    Axios.get('/topics', {
      params: {
        tab
      }
    }).then(res => {
      const data = res.data.data;
      this.scroll.scrollTop = 0;
      this.setState({ contents: data, status: true });
    });
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
