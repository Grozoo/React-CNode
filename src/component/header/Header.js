import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './header.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  state = {
    current: window.location.pathname.substr(1)
      ? window.location.pathname.substr(1)
      : window.location.search.slice(5) || 'all'
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
          <SubMenu
            title={
              <span>
                <Icon type="setting" />
              </span>
            }
          >
            <MenuItemGroup title="Setting">
              <Menu.Item key="newtopic">
                <NavLink to="/newtopic">发表</NavLink>
              </Menu.Item>
              <Menu.Item key="messages">
                {' '}
                <NavLink to="/messages">消息</NavLink>
              </Menu.Item>
              <Menu.Item key="login">
                {' '}
                <NavLink to="/login">我的</NavLink>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </header>
    );
  }
}

export default Header;
