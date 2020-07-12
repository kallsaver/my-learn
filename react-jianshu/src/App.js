import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import router from './router/index.js'

import CHeader from './components/c-header/c-header'

function App() {
  return (
    <div>
      <CHeader></CHeader>
      <HashRouter>
        {renderRoutes(router)}
      </HashRouter>
    </div>
  )
}

export default App
