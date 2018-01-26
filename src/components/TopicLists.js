import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
/**
 *
 * @param {Array} list 接受数组渲染
 *
 */
const TopicLists = ({ list = [] }) => (
  <div className="topic_list">
    {list.map((item, key) => (
      <div key={key} className="list">
        <Link to={`/user/${item.author.loginname}`}>
          <img
            alt="avatar_url"
            className="avatar_url"
            src={item.author.avatar_url}
          />
        </Link>
        <Link to={`/topic/${item.id}`}>
          <h3>{item.title}</h3>
          <div>
            <span>{item.author.loginname}</span>
            <span>· 发表于:{moment(`${item.create_at}`).fromNow()}</span>
            <span>· reply:{item.reply_count}</span>
          </div>
        </Link>
      </div>
    ))}
  </div>
);
export default TopicLists;
