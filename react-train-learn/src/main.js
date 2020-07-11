import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import * as serviceWorker from './serviceWorker'

class Test {
  constructor() {

  }

  a = 1
}

const a = new Test()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// serviceWorker.unregister()

