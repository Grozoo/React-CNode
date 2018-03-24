import React from 'react';
import { Link } from 'react-router-dom';
import UserAction from './UserAction';
import { List, Avatar } from 'antd';

function showhtml(record) {
  var html = { __html: record.content };

  return <div dangerouslySetInnerHTML={html} />;
}
const Comment = ({ comment = [], topicId }) => {
  {
    comment.map(v => {
      console.log(v);
    });
  }
  return (
    <div className="comment">
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={comment}
        renderItem={item => (
          <div>
            <List.Item
              actions={[
                <UserAction
                  replyId={item.id} //评论id
                  ups={item.ups}
                  replyTarId={item.reply_id} //回复目标id
                  topicId={topicId}
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={
                  <Link to={`/user/${item.author.loginname}`}>
                    {item.author.loginname}
                  </Link>
                }
                description={showhtml(item)}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default Comment;
