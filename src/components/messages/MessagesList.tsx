import { forwardRef, RefObject } from 'react'
import { MessageItem } from '@/components/messages/MessageItem'
import { Message } from '@/models/response/messages'
import { Spinner } from '@/components/ui/AppLoader'
import clsx from 'clsx'

interface MessagesListProps {
  handleScroll: () => void
  messages: Message[]
  bottomRef?: RefObject<HTMLDivElement | null>
  isFetchingNextPage?: boolean
}

export const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(
  ({ handleScroll, messages, bottomRef, isFetchingNextPage }, ref) => {
    return (
      <div
        ref={ref}
        onScroll={handleScroll}
        className={clsx(
          'flex-1 min-h-0 px-4 py-6 space-y-4 overflow-y-auto relative',
          isFetchingNextPage && 'overflow-hidden'
        )}
      >
        <div
          className={clsx(
            'flex justify-center transition-opacity duration-300 ease-in-out',
            isFetchingNextPage ? 'opacity-100 pb-2' : 'opacity-0 pointer-events-none h-0'
          )}
        >
          <Spinner />
        </div>

        {messages.map((msg) => (
          <MessageItem key={msg._id} isUser={msg.from === 'user'} content={msg.content} />
        ))}

        <div ref={bottomRef} />
      </div>
    )
  }
)

MessagesList.displayName = 'MessagesList'
