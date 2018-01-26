import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="nav">
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: 'bold',
              border: '0.08em solid sandybrown',
              borderTop: '0'
            }}
          >
            首页
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/newtopic"
            activeStyle={{
              fontWeight: 'bold',
              border: '0.08em solid sandybrown',
              borderTop: '0'
            }}
          >
            发表
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messages"
            activeStyle={{
              fontWeight: 'bold',
              border: '0.08em solid sandybrown',
              borderTop: '0'
            }}
          >
            消息
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/userhome"
            activeStyle={{
              fontWeight: 'bold',
              border: '0.08em solid sandybrown',
              borderTop: '0'
            }}
          >
            我的
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
