import React, { useState, useMemo } from 'react'
import { useCallback } from 'react'

const UseMemo = (props) => {
  console.log('UseMemo render')

  const [count, setCount] = useState(() => {
    // 这个回调只会执行一次
    return props.count || 0
  })

  const [clickCount, setClickCount] = useState(() => {
    return props.clickCount || 0
  })

  // computed的效果
  const double = useMemo(() => {
    return count * 2
  }, [count])

  // const onClick = useCallback(() => {
  //   console.log('onClick')
  //   setClickCount(clickCount + 1)
  // }, [clickCount])

  const onClick = () => {
    console.log('cick')
  }

  const clickHandler = () => {
    console.log('clickHandler')
    setCount(count + 1)
  }

  return (
    <div>
      <div>count: {count}</div>
      <div>double: {double}</div>
      <button onClick={clickHandler}>click</button>
      {/* <div>clickCount: {clickCount}</div> */}
      <button onClick={onClick}>{double}onClick</button>
    </div>
  )
}

export default UseMemo
