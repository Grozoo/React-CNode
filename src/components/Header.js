import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

class Header extends React.Component {
  state = {
    current: window.location.search.slice(5) || 'all'
  };
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <header id="header">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="all">
            <NavLink to="/">全部</NavLink>
          </Menu.Item>

          <Menu.Item key="good">
            <NavLink to={{ pathname: '/', search: '?tab=good' }}>精华</NavLink>
          </Menu.Item>

          <Menu.Item key="share">
            <NavLink to={{ pathname: '/', search: '?tab=share' }}>分享</NavLink>
          </Menu.Item>

          <Menu.Item key="ask">
            <NavLink to={{ pathname: '/', search: '?tab=ask' }}>问答</NavLink>
          </Menu.Item>

          <Menu.Item key="job">
            <NavLink to={{ pathname: '/', search: '?tab=job' }}>招聘</NavLink>
          </Menu.Item>

          <Menu.Item key="dev">
            <NavLink to={{ pathname: '/', search: '?tab=dev' }}>测试区</NavLink>
          </Menu.Item>
        </Menu>
      </header>
    );
  }
}

export default Header;
