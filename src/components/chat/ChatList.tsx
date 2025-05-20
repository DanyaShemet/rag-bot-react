import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { getChats } from '@/api/chat'
import { getErrorMessage } from '@/helpers/error-handler'
import { useEffect } from 'react'
import { ChatItem } from '@/components/chat/ChatListItem'
import { Spinner } from '@/components/ui/AppLoader'
import { useNavigate } from 'react-router-dom'
import { useCreateChat } from '@/services/mutations/use-create-chat'
import { useDeleteChat } from '@/services/mutations/use-delete-chat'

export function ChatList() {
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateChat()
  const { mutate: deleteMutate, isPending: isPendingDelete } = useDeleteChat()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  })

  const handleOpen = (id: string) => navigate(`/chat/${id}`)

  const handleDelete = (id: string) => deleteMutate({ id })

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [isError, error])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-6 flex justify-center flex-col items-center">
      <p>Оберіть чат</p>

      {data?.data?.length === 0 && (
        <div className="text-center text-gray-500">
          У вас ще немає чатів. Натисніть кнопку нижче, щоб створити перший!
        </div>
      )}

      {!!data?.data?.length && (
        <ul className="space-y-2 w-full">
          {data?.data.map((item) => (
            <ChatItem
              key={item._id}
              id={item._id}
              title={item.title}
              isPendingDelete={isPendingDelete}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {isPending ? 'Створення...' : '+ Новий чат'}
      </button>
    </div>
  )
}
