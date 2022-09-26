import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export const routesConfig = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]

const RoutesList = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
      </ul>

      <Routes>
        {
          routesConfig.map(({ path, Component }) => (
            <Route exact path={path} element={<Component />}></Route>
          ))
        }
      </Routes>
    </div>
  )
}

export default RoutesList