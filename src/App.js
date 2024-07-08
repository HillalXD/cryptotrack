import React from 'react'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Error from './pages/error/Error'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: "/crypto/:coinName",
      element: <Detail />,
      errorElement: <Error />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}
