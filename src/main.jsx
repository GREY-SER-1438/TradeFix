import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider, useAuth } from './shared/context/auth-context.jsx'
import './index.css'

function AppWithAuth() {
  const { getMe } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) getMe()
  }, [getMe])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
