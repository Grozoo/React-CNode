import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'

var NotMatch = ({ history }) => {
  return (
    <section className="not-match">
      <div>
        <div className="page-text">卧槽！页面不见了！</div>
        <div className="go">
          <Link to="/">首页</Link>
        </div>
      </div>
    </section>
  );
};

export default NotMatch;
