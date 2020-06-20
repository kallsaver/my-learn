import React, { Component, createContext, memo, useState, useContext } from 'react'

const BatteryContext = createContext(50)

// 类组件写法
class Left extends Component {
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
    // return <Left></Left>
    return <Right></Right>
  }
}

// class Context extends Component {
//   state = {
//     battery: 60
//   }

//   render() {
//     console.log('context render')
//     const { battery } = this.state
//     return (
//       <BatteryContext.Provider value={battery}>
//         <button onClick={this.clickHandler}>Press</button>
//         <Middle></Middle>
//       </BatteryContext.Provider>
//     )
//   }

//   clickHandler = () => {
//     const { battery } = this.state
//     this.setState({
//       battery: battery + 1
//     })
//   }
// }

const Right = () => {
  const battery = useContext(BatteryContext)
  return (
    <div>Battery: {battery}</div>
  )
}

// react-hooks写法
const Context = memo(() => {
  const [battery, setBattery] = useState(60)

  const clickHandler = () => {
    setBattery(battery + 1)
  }

  return (
    <BatteryContext.Provider value={battery}>
      <button onClick={clickHandler}>Press</button>
      <Middle></Middle>
    </BatteryContext.Provider>
  )
})

export default Context
