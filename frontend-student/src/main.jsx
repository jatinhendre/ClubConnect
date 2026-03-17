import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AlertProvider } from './context/AlertContext.jsx'
import './styles/alert.css'

createRoot(document.getElementById('root')).render(
  <AlertProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AlertProvider>
)
