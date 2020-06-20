import React, { Component, lazy, Suspense, useState } from 'react'
import Context from './context.jsx'
import Memo from './memo.jsx'
import UseState from './use-state.jsx'

const Lazy = lazy(() => import('./lazy.jsx'))

class App extends Component {
  state = {
    count: 0,
    name: 'name',
    person: {
      age: 0,
    }
  }

  render() {
    console.log('App render')
    return (
      <div>
        {/* <Suspense fallback={<div>loading</div>}>
          <Lazy></Lazy>
        </Suspense> */}
        <Context></Context>
        <Memo person={this.state.person} name={this.state.name}></Memo>
        <button onClick={this.clickHandler}>count: {this.state.count}</button>
        <UseState></UseState>
      </div>
    )
  }

  clickHandler = () => {
    const { count, name, person } = this.state
    person.age++
    this.setState({
      count: count + 1,
      // name: name + 'e',
      person,
    })
  }

  componentDidCatch() {
    console.log('error')
  }
}

export default App
