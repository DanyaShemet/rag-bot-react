import AppHeader from '@/components/ui/AppHeader'
import ChatForm from '@/components/ChatForm'
import { useQuery } from '@tanstack/react-query'
import { getChatById } from '@/api/chat'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/AppLoader'

export default function Bot() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isError, isLoading } = useQuery({
    queryFn: () => id && getChatById({ id }),
    queryKey: ['chat'],
    enabled: !!id,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Чат не знайдено або сталася помилка')
      navigate('/')
    }
  }, [isError, navigate])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <AppHeader />
      <main className="p-4 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          {data?.title ?? 'Без назви'}
        </h1>
        <ChatForm chatId={id} />
      </main>
    </>
  )
}
