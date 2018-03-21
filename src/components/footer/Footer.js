import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import './footer.css';

class Footer extends React.Component {
  state = {
    current: window.location.pathname || 'all'
  };
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <footer id="footer">
        <Menu
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
          mode="horizontal"
        >
          <Menu.Item key="/all">
            <NavLink exact to="/">
              首页
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/newtopic">
            <NavLink to="/newtopic">发表</NavLink>
          </Menu.Item>
          <Menu.Item key="/messages">
            <NavLink to="/messages">消息</NavLink>
          </Menu.Item>
          <Menu.Item key="/userhome">
            <NavLink to="/userhome">我的</NavLink>
          </Menu.Item>
        </Menu>
      </footer>
    );
  }
}
export default Footer;
