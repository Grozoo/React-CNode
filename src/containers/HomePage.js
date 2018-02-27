import React, { Component } from 'react';
import { Header, Footer, TopicLists } from '../components/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../store/actions/getDataAction';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
  }
  componentDidMount() {
    let tab = this.props.location.search.slice(5);
    this.props.getData({ tab });
  }
  onScrollHandle = event => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    let tab = this.props.location.search.slice(5);
    if (scrollTop + clientHeight === scrollHeight) {
    }
  };
  componentWillReceiveProps(nextProps) {
    let tab = this.props.location.search.slice(5);
    let nextTab = nextProps.location.search.slice(5);
    if (tab === nextTab) {
      return false;
    }
  }
  render() {
    const wait = '正在加载中···';
    return (
      <div className="rootMain">
        {/*  <Header /> */}
        <div
          className="main"
          onScroll={this.onScrollHandle}
          ref={node => {
            this.scroll = node;
          }}
        >
          {!this.props.isReq ? (
            <TopicLists list={this.props.data} />
          ) : (
            <h1 className="wait">{wait}</h1>
          )}
          {/*  {this.state.loading ? <h1 className="loading">{wait}</h1> : null}  */}
        </div>
      </div>
    );
  }
}

export default connect(
  state => state.allData,
  dispatch => bindActionCreators(action, dispatch)
)(HomePage);
