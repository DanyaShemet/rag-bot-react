import AppHeader from '@/components/ui/AppHeader'
import { Spinner } from '@/components/ui/AppLoader'
import { useMutation, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { getChatById, askChat } from '@/api/chat'
import { getMessages } from '@/api/messages'
import { useNavigate, useParams } from 'react-router-dom'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { MessagesList } from '@/components/messages/MessagesList'
import { ChatInputForm } from '@/components/messages/ChatInput'
import { getErrorMessage } from '@/helpers/error-handler'
import { useChatInfo } from '@/hooks/chat/use-chat-info'

export default function Bot() {
  const { id: chatId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState('')
  const [question, setQuestion] = useState('')
  const hasScrolledInitially = useRef(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: chat, isLoading: isChatLoading } = useChatInfo(chatId)

  const {
    data: messages,
    isLoading: isMessagesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMessages({ chatId: chatId!, page: pageParam }),
    getNextPageParam: (data) => data.nextPage,
    enabled: !!chatId,
  })

  const {
    mutate,
    isPending: isSending,
    error,
    isError,
  } = useMutation({
    mutationFn: askChat,
    onSuccess: () => {
      setQuestion('')
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] })
    },
  })

  const pages = (messages?.pages ?? []).slice().reverse()
  const messagesData = pages.flatMap((page) => [...page.data].reverse())

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !chatId) return
    mutate({ question, chatId })
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container || isFetchingNextPage || !hasNextPage) return

    if (container.scrollTop < 100) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    if (isError) {
      setErrorMessage(getErrorMessage(error))
    }
  }, [isError, error])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isMessagesLoading || hasScrolledInitially.current) return

    const timeout = setTimeout(() => {
      el.scrollTop = el.scrollHeight
      hasScrolledInitially.current = true
    }, 100)

    return () => clearTimeout(timeout)
  }, [pages.length, isMessagesLoading])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isFetchingNextPage || !hasNextPage) return

    if (el.scrollHeight <= el.clientHeight + 100) {
      fetchNextPage()
    }
  }, [pages.length, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isChatLoading || isMessagesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex-1 min-h-0 flex flex-col">
        <h1 className="text-3xl font-bold text-center text-indigo-700 py-4">
          {chat?.title ?? 'Без назви'}
        </h1>

        <div className="flex-1 min-h-0">
          <div className="flex flex-col h-full w-full bg-gray-50">
            <MessagesList
              ref={scrollRef}
              handleScroll={handleScroll}
              isFetchingNextPage={isFetchingNextPage}
              messages={messagesData}
              bottomRef={bottomRef}
            />

            <ChatInputForm
              question={question}
              onChange={setQuestion}
              onSubmit={handleSubmit}
              isPending={isSending}
            />

            {isError && <p className="text-red-500 text-sm px-4 pb-2">❌ {errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
