import { api } from './index.js'

export interface ChatResponse {
  reply: string
}

export interface ChatItem {
  _id: string
  userId: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface Chats {
  data: ChatItem[]
}

export async function askChat(question: string): Promise<ChatResponse> {
  return await api.post('/chat', { question }).then((r) => r.data)
}

export async function createChat() {
  return await api.post('/chats').then((r) => r.data)
}

export async function getChats(): Promise<Chats> {
  return await api.get('/chats').then((r) => r.data)
}

export async function getChatById({ id }: { id: string }) {
  return await api.get(`/chats/${id}`).then((r) => r.data)
}

export async function updateChat({ id, data }: { id: string; data: { name: string } }) {
  return await api.put(`/chats/${id}`, data).then((r) => r.data)
}

export async function deleteChat({ id }: { id: string }) {
  return await api.delete(`/chats/${id}`).then((r) => r.data)
}
