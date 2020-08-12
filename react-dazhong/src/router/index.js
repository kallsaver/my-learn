import React, { lazy, Suspense } from 'react'

const Home = lazy(() => import('../pages/home/index'))

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: SuspenseComponent(Home),
  },
  {
    path: '/home',
    component: SuspenseComponent(Home),
  },
]
