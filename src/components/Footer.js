import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const activeStyle = {
    fontWeight: 'bold',
    border: '0.08em solid sandybrown',
    borderTop: '0'
  };
  return (
    <footer className="nav">
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            首页
          </NavLink>
        </li>
        <li>
          <NavLink to="/newtopic" activeStyle={activeStyle}>
            发表
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" activeStyle={activeStyle}>
            消息
          </NavLink>
        </li>
        <li>
          <NavLink to="/userhome" activeStyle={activeStyle}>
            我的
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
