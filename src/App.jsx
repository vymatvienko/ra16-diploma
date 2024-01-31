import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import MainPage from './components/pages/MainPage'
import CatalogPage from './components/pages/CatalogPage'
import AboutStorePage from './components/pages/AboutStorePage'
import ContactsPage from './components/pages/ContactsPage'
import ErrorPage from './components/pages/404Page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />
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
