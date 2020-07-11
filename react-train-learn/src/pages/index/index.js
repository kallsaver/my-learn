import React, { Component } from 'react'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { content, test } = this.props
    return (
      <div onClick={this.handleClick}>
        {test} - {content}
      </div>
    )
  }

  handleClick = () => {
    console.log('click')
  }
}

export default Index
