import AppHeader from '@/components/ui/AppHeader'
import { Spinner } from '@/components/ui/AppLoader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { askChat } from '@/api/chat'
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { MessagesList } from '@/components/messages/MessagesList'
import { ChatInputForm } from '@/components/messages/ChatInput'
import { getErrorMessage } from '@/helpers/error-handler'
import { useChatInfo } from '@/hooks/chat/use-chat-info'
import { useChatMessages } from '@/hooks/chat/use-chat-messages'
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom'

export default function Bot() {
  const { id: chatId } = useParams()
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState('')
  const [question, setQuestion] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: chat, isLoading: isChatLoading } = useChatInfo(chatId)

  const { scrollToBottom } = useScrollToBottom(scrollRef)

  const {
    messagesData,
    isLoading: isMessagesLoading,
    handleScroll,
    isFetchingNextPage,
  } = useChatMessages(chatId, scrollRef)

  const {
    mutate,
    isPending: isSending,
    error,
    isError,
  } = useMutation({
    mutationFn: askChat,
    onSuccess: async () => {
      setQuestion('')
      await queryClient.invalidateQueries({ queryKey: ['messages', chatId] })

      setTimeout(() => {
        scrollToBottom()
      }, 100)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !chatId) return
    mutate({ question, chatId })
  }

  useEffect(() => {
    if (isError) {
      setErrorMessage(getErrorMessage(error))
    }
  }, [isError, error])

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
