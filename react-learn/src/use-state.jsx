import React, { memo, useState, useEffect } from 'react'

// 注意函数式编程的陷阱
const UseState = memo((props) => {
  console.log('useState render')

  const [count, setCount] = useState(() => {
    // 这个回调只会执行一次
    return props.count || 0
  })
  const [name, setName] = useState(() => {
    return props.name || 'Mike'
  })

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  // useEffect第二个参数为undefined时,每次渲染都会执行第一个参数
  useEffect(() => {
    // 组件挂载之后
    const onResize = () => {
      // 注意这个count是第一个函数体的闭包count(纯函数式编程不能很好解决的问题)
      // 这就是纯函数式编程不能很好解决的问题(1.有性能浪费,没有缓存系统. 2.副作用代码要重复绑定)
      console.log(count)
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    }
    window.addEventListener('resize', onResize, false)

    return () => {
      // 组件卸载之前
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  // useEffect第二个参数为数组,当数组的元素和上一次的对比变化了会执行第一个参数
  // 所以用useEffect的时候,里面使用到的变量要依赖到外面的数组里,
  // 同时里面用的函数体也在里面申明减少渲染时的无意义代码
  useEffect(() => {
    console.log('count:', count)
  }, [count])

  const clickHandler = () => {
    setName(name + 'e')
    setCount(count + 1)
  }

  return (
    <div>
      <div>count: {count}</div>
      <div>name: {name}</div>
      <button onClick={clickHandler}>click</button>
      <div>size: {size.width} {size.height}</div>
    </div>
  )
})

export default UseState
