import React, { Component, PureComponent, memo } from 'react'

// 不希望组件被重新渲染的用法

// class Memo extends Component {
//   state = {}
//   // 父组件更新时,组件setState变化这里会触发
//   // 不重新渲染通用场景:
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.name === this.props.name) {
//       return false
//     }
//     return true
//   }

//   render() {
//     console.log('memo render')
//     return (
//       <div>{this.state.name}</div>
//     )
//   }
// }

// state的属性的引用被改变时会触发render,否则不会
// 缺点是不能深度判断
// 优点是自动判断
// class Memo extends PureComponent {
//   state = {}

//   render() {
//     console.log('memo render')
//     return (
//       <div>
//         <div>{this.props.name}</div>
//         <div>person.age: {this.props.person.age}</div>
//       </div>
//     )
//   }
// }

// 无状态组件用memo来
// 缺点是不能深度判断
// 优点是自动判断
const Memo = memo((props) => {
  console.log('memo render')
  return (
    <div>
      <div>name: {props.name}</div>
      <div>person.age: {props.person.age}</div>
    </div>
  )
})

export default Memo
