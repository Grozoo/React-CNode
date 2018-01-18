import React, { Component } from 'react'
import { Footer } from "../components/index"



class NewTopic extends Component {
  constructor() {
    super()
    this.state = {
      tab: '',
      title: '',
      content: ''
    }
  }
  contentsChange = (e) => {
    //console.log(e.target)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = () => {
    console.log(localStorage.token)
    fetch(`https://cnodejs.org/api/v1/topics/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accesstoken: localStorage.token,
        title: this.state.title,
        tab: this.state.tab,
        content: this.state.content
      })
    }).then(res => {
      console.log(this.props, res.json())
      //this.props.history.push(`/topic/${res}`)
      //频率限制：当前操作每天可以进行 7 次~~~~~~~
    })
  }
  render() {
    console.log(`NewTopics`)
    return (
      <div>
        <header>
          <h2 onClick={this.handleSubmit}>发表</h2>
        </header>
        <form onChange={this.contentsChange} >
          <select className='new-topic-selece' name='tab'>
            <option value='' defaultValue >请选择分类</option>
            <option value='share' >分享</option>
            <option value='ask'>问答</option>
            <option value='job'>招聘</option>
            <option value='dev'>测试</option>
          </select>
          <input autoFocus type='text' placeholder='标题' name='title' />
          <div>
            <textarea name='content' />
          </div>
        </form>
        <Footer />
      </div>
    )
  }
}

export default NewTopic
