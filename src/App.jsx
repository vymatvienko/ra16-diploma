import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import MainPage from './components/pages/MainPage/MainPage'
import CatalogPage from './components/pages/CatalogPage/CatalogPage'
import AboutStorePage from './components/pages/AboutStorePage'
import ContactsPage from './components/pages/ContactsPage'
import ErrorPage from './components/pages/404Page'
import requestTopSales from './components/pages/MainPage/requestTopSales'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const hitsPromise = requestTopSales();
      return defer({ hitsPromise });
    }
  },
  {
    path: '/catalog.html',
    element: <CatalogPage />,
  },
  {
    path: '/about.html',
    element: <AboutStorePage />,
  },
  {
    path: '/contacts.html',
    element: <ContactsPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
