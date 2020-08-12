import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import router from './router/index.js'

class App extends Component {
  render() {
    return (
      <HashRouter>
        {renderRoutes(router)}
      </HashRouter>
    )
  }
}

export default App
