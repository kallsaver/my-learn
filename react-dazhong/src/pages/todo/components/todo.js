import React, { Component } from 'react'

class Todo extends Component {
  render() {
    const { isCompleted, text, onClick } = this.props
    return (
      <li style={{
        textDecoration: isCompleted ? 'line-through' : 'none'
        }}
        onClick={onClick}
      >
        {text}
      </li>
    )
  }
}

export default Todo
