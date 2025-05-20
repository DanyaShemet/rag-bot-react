import { useMutation } from '@tanstack/react-query'
import { createChat } from '@/api/chat'
import { toast } from 'sonner'
import { withDefaultErrorHandler } from '@/helpers/error-handler'
import { useNavigate } from 'react-router-dom'

export const useCreateChat = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      console.log(data)
      toast.success('Чат створено')
      navigate(`/chat/${data.chatId}`)
    },
    onError: withDefaultErrorHandler(),
  })
}
