import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BackTop } from 'antd';

import axios from 'axios';
import './home.css';

import { List, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      C: this,
      page: 1,
      data: [],
      loading: false,
      hasMore: true
    };
    this.scroll = React.createRef();
  }
  componentDidMount() {
    const tab = this.props.location.search.slice(5);
    const page = this.state.page;
    this.setState({
      loading: true
    });
    axios.get('/topics', {
      params: {
        tab,
        page
      }
    })
      .then(res => {
        const data = res.data.data;
        this.setState(prevState => ({
          data: data,
          page: prevState.page + 1,
          loading: false
        }));
      });
  }
  //这里不能异步，以下为骚操作，请勿模仿。
  static getDerivedStateFromProps(nextProps, prevState) {
    const tab = nextProps.location.search.slice(5);
    axios.get('/topics', { params: { tab: tab } })
      .then(_ => {
        const data = _.data.data;
        prevState.C.scroll.current.scrollTop = 0;
        prevState.C.setState({ data: data });
      })
    return true;
  };
  /*  componentWillReceiveProps(nextProps) {
     const tab = nextProps.location.search.slice(5);
     this.setState({
       loading: true
     });
     axios.get('/topics', {
       params: {
         tab
       }
     })
       .then(res => {
         const data = res.data.data;
         this.scroll.current.scrollTop = 0;
         this.setState({ data: data });
       });
   } */
  handleInfiniteOnLoad = () => {
    const tab = this.props.location.search.slice(5);
    const page = this.state.page;
    this.setState({
      loading: true
    });
    axios.get('/topics', {
      params: {
        tab,
        page
      }
    })
      .then(res => {
        const data = res.data.data;
        this.setState(prevState => ({
          data: prevState.data.concat(data),
          page: prevState.page + 1,
          loading: false
        }));
      });
  };

  render() {
    //console.log(this.state);
    return (
      <React.Fragment>
        <div ref={this.scroll} className="main">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Link to={`/user/${item.author.loginname}`}>
                        <Avatar src={item.author.avatar_url} />
                      </Link>
                    }
                    title={<Link to={`/topic/${item.id}`}>{item.title}</Link>}
                    description={
                      <span>
                        <Link to={`/user/${item.author.loginname}`}>
                          {item.author.loginname}
                        </Link>
                        · 发表于:{moment(`${item.create_at}`).fromNow()} · ·
                        reply:{item.reply_count}
                      </span>
                    }
                  />
                  <div style={{ textAlign: 'right' }}>
                    <p>{item.reply_count}/{item.visit_count}</p>
                    <p>{moment(item.last_reply_at).fromNow()}</p>
                  </div>
                </List.Item>
              )}
            >
              {this.state.loading &&
                this.state.hasMore && <Spin className="loading" />}
            </List>
          </InfiniteScroll>
        </div>
        <BackTop target={() => this.scroll.current} />
      </React.Fragment>
    );
  }
}
export default HomePage;
