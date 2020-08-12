import React, { Component } from 'react'
import TodoList from './components/todo-list'
import AddTodo from './components/add-todo'
import Footer from './components/footer'

class App extends Component {
  state = {
    todoList: [],
    filter: 'all'
  }

  nextTodo = 0

  render() {
    const todoList = this.getVisibleTodoList()
    return (
      <div>
        <AddTodo filter={this.state.filter} addTodo={this.addTodo}></AddTodo>
        <TodoList todoList={todoList} toggleTodo={this.toggleTodo}></TodoList>
        <Footer filter={this.state.filter} setVisibilityFilter={this.setVisibilityFilter}></Footer>
      </div>
    )
  }

  getVisibleTodoList = () => {
    const currentFilter = this.state.filter
    return this.state.todoList.filter((item) => {
      if (currentFilter === 'active') {
        return !item.isCompleted
      } else if (currentFilter === 'completed') {
        return item.isCompleted
      } else {
        return true
      }
    })
  }

  addTodo = (text) => {
    const todo = {
      id: this.nextTodo++,
      text,
      isCompleted: false
    }
    const nextTodoList = [todo, ...this.state.todoList]
    this.setState({
      todoList: nextTodoList
    })
  }

  toggleTodo = (id) => {
    const newTodoList = this.state.todoList.map((item) => {
      return item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    })
    this.setState({
      todoList: newTodoList
    })
  }

  setVisibilityFilter = filter => {
    this.setState({
      filter
    })
  }
}

export default App
