import { api } from './index.js'

export function getStatus() {
  return api.get(`/api/status`).then((r) => r.data)
}

export function resetSession() {
  return api.delete(`/api/reset`).then((r) => r.data)
}
