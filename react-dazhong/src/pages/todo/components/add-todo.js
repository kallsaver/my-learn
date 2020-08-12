import React, { Component } from 'react'

class AddTodo extends Component {
  state = {
    text: ''
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onChange={this.handleTextChange} />
        <button onClick={this.handleClick}>Add</button>
      </div>
    )
  }

  handleTextChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClick = () => {
    this.props.addTodo(this.state.text)
  }
}

export default AddTodo
