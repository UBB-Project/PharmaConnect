import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import the router components
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import your page components
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)