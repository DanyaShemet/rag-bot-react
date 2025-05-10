import { BrowserRouter, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setLogoutHandler } from './lib/navigation'
import App from './App'

function AppWrapperInner() {
  const navigate = useNavigate()

  useEffect(() => {
    setLogoutHandler(() => {
      navigate('/login')
    })
  }, [navigate])

  return <App />
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AppWrapperInner />
    </BrowserRouter>
  )
}
