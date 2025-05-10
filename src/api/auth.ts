import { api } from '@/api/index'
import { Login } from '@/models/request/login'

export async function login({ email, password }: Login) {
  return api.post('/auth/login/', { email, password }).then((r) => r.data)
}

export function register({ email, password }: Login) {
  return api.post('/auth/register/', { email, password }).then((r) => r.data)
}

export interface User {
  email: string
}
export function getMe(): Promise<User> {
  return api.get('auth/me').then((r) => r.data)
}
