import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/components.css'
import './styles/alert.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { AlertProvider } from './context/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AlertProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AlertProvider>
  </AuthProvider>
)
