import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteChat } from '@/api/chat'
import { toast } from 'sonner'
import { withDefaultErrorHandler } from '@/helpers/error-handler'

export const useDeleteChat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      toast.success('Чат видалено')
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
    onError: withDefaultErrorHandler(),
  })
}
