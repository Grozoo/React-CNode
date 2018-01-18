import React from 'react';
import { Link } from 'react-router-dom';
import UserAction from './UserAction'

const Comment = ({comment = []}) =>
  <div className="reply">
    {comment.map((item, index) =>
      <div key={index} className='replies_list'>
        <img className='avatar_url' src={item.author.avatar_url} alt='avatar' />
        <Link to={`/user/${item.author.loginname}`}>{item.author.loginname} </Link>
        <UserAction replyId={item.id} ups={item.ups} tipcId={item.reply_id} />
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    ) && <h1>(＃°Д°)还没有没有回复哦~~</h1> }
  </div>

//this.state.data.replies.length ? <div className="reply"> : <h1>{noReplies}</h1>
export default Comment;
