import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path: '/*',
    element: <App />,
  },
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)
