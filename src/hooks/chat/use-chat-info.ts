import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChatById } from '@/api/chat'
import { toast } from 'sonner'

export const useChatInfo = (chatId?: string) => {
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChatById({ id: chatId! }),
    enabled: !!chatId,
  })

  const { isError } = query

  if (isError) {
    toast.error('Чат не знайдено або сталася помилка')
    navigate('/')
  }

  return query
}
