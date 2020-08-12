import React, { Component } from 'react'
import Todo from './todo'

class TodoList extends Component {

  render() {
    const { todoList, toggleTodo } = this.props
    return (
      <ul>
        {
          todoList.map((todo) => {
            return <Todo key={todo.id} {...todo}
              onClick={() => {toggleTodo(todo.id)}}
            />
          })
        }
      </ul>
    )
  }
}

export default TodoList
