import { api } from './index.js'

export interface ChatResponse {
  reply: string
}
export function askChat(question: string): Promise<ChatResponse> {
  return api.post('/api/chat', { question }).then((r) => r.data)
}
