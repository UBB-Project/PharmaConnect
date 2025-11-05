import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import ItemPage from './pages/ItemPage.jsx'


const router = createBrowserRouter([
    {path: '/' , element: <App />},
    {path: '/items/:id',element: <ItemPage />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
