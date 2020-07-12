import React, { lazy, Suspense } from 'react'

const Home = lazy(() => import('../pages/home/home.jsx'))
const Detail = lazy(() => import('../pages/detail/detail.js'))

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/home',
    component: SuspenseComponent(Home),
  },
  {
    path: '/detail/:id',
    component: SuspenseComponent(Detail),
  }
]
