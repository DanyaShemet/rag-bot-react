import { api } from './index.js'
import { Status } from '@/models/response/status'

export function getStatus(): Promise<Status> {
  return api.get(`/api/status`).then((r) => r.data)
}

export function resetSession() {
  return api.delete(`/api/reset`).then((r) => r.data)
}
