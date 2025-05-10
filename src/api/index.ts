import axios from 'axios'
import { triggerLogout } from '../lib/navigation'
import { toast } from 'sonner'
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      triggerLogout()
    } else if (status === 403) {
      toast.error('🚫 Доступ заборонено')
    }

    return Promise.reject(err)
  }
)
