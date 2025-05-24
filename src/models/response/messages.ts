import { Sender } from '@/models/enums/sender'

export interface Message {
  _id: string
  chatId: string
  from: Sender
  content: string
  timestamp: string
}

export interface MessagesRO {
  data: Message[]
  nextPage?: number
}
