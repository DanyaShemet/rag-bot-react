import { api } from './index.js'
import { Status } from '@/models/response/status'

export function getStatus(): Promise<Status> {
  return api.get(`/status`).then((r) => r.data)
}

export function resetSession() {
  return api.delete(`/reset`).then((r) => r.data)
}
