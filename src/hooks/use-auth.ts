import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const isAuthenticated = Boolean(token)

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        navigate('/login')
    }, [navigate])

    return { token, isAuthenticated, logout }
}
