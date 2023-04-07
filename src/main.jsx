import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import Rockets from './pages/Rockets'
import Weather from './pages/Weather'
import RocketControl from './pages/RocketControl'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Rockets />,
      },
      {
        path: '/control_rocket/:id',
        element: <RocketControl />,
      },
      {
        path: '/weather',
        element: <Weather />,
      },
      {
        path: '/*',
        element: <p>Not Found</p>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
