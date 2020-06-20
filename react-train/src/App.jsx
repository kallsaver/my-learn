import React, { Component, createContext } from 'react'
import './App.css'

const BatteryContext = createContext(50)

class Leaf extends Component {
  // 写法一: 适用于普遍场景
  // render() {
  //   return (
  //     <BatteryContext.Consumer>
  //       {
  //         battery => <div>Battery: {battery}</div>
  //       }
  //     </BatteryContext.Consumer>
  //   )
  // }
  // 写法二: 适用于只有一个context
  static contextType = BatteryContext
  render() {
    const battery = this.context
    return (
      <div>Battery: {battery}</div>
    )
  }
}

class Middle extends Component {
  render() {
    return <Leaf></Leaf>
  }
}

class App extends Component {
  state = {
    battery: 60
  }

  render() {
    const { battery } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <button onClick={this.clickHandler}>Press</button>
        <Middle></Middle>
      </BatteryContext.Provider>
    )
  }

  // clickHandler() {
  //   const { battery } = this.state
  //   this.setState({
  //     battery: battery + 1
  //   })
  // }

  clickHandler = ()  => {
    const { battery } = this.state
    this.setState({
      battery: battery + 1
    })
  }
}

export default App;
