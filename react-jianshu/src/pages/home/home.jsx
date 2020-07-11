import React, { Component } from 'react'

import style from './home.scss'

class Index extends Component {
  state = {}

  render() {
    console.log('render')
    return (
      <div className={style.home}>
        <div className="home-left">
          <div className="topic">
            <div className="topic-item">
              <div className="topic-pic"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  handleClick = () => {
    console.log(this)
  }
}

export default Index
