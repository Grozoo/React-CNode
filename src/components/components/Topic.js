import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { UserAction } from '../index'

class Topic extends Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  componentWillMount() {
    fetch(`https://cnodejs.org/api/v1/${this.props.location.pathname}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.data })
        document.title = json.data.title
      })
  }
  render() {
    const wait = ">_< 等 等 啦 ~ ~ "
    const noReplies = '(＃°Д°)还没有没有回复哦~~'
    return (
      <div>
        <div className='nav topic_nav' onClick={() => this.props.history.goBack()}>
          <span>返回</span>
          <span><Link to={`${this.props.location.pathname}/edit`}>编辑</Link></span>
        </div>

        {this.state.data ?
          <section className='topic'>
            <div className='section_header'>
              <h2>{this.state.data.title}</h2>
              <span>{this.state.data.author.loginname}</span>
              <span>发表于{moment(`${this.state.data.create_at}`).fromNow()} </span>
              <span>{this.state.data.visit_count}次观看</span>
            </div>
            <div className='topic_contents' dangerouslySetInnerHTML={{ __html: this.state.data.content }} />

            <div className="reply">
              {
                this.state.data.replies.length ?
                  <div>
                    {
                      this.state.data.replies.map((item, index) =>
                        <div key={index} className='replies_list'>
                          <img className='avatar_url' src={item.author.avatar_url} alt='avatar' />
                          <Link to={`/user/${item.author.loginname}`}>{item.author.loginname} </Link>
                          <UserAction replyId={item.id} ups={item.ups} tipcId={this.props.location.pathname} />
                          <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                      )
                    }
                  </div>
                  : <span>{noReplies}</span>
              }
            </div>

          </section>
          : <h1>{wait}</h1>
        }

      </div>
    )
  }
}
export default Topic