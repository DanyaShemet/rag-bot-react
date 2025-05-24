import { useInfiniteQuery } from '@tanstack/react-query'
import { getMessages } from '@/api/messages'
import { useEffect, useRef } from 'react'
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom'

export const useChatMessages = (
  chatId?: string,
  scrollRef?: React.RefObject<HTMLDivElement | null>
) => {
  const {
    data: messages,
    isLoading,
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

  const { scrollToBottom } = useScrollToBottom(scrollRef)

  const hasScrolledInitially = useRef(false)

  const pages = (messages?.pages ?? []).slice().reverse()
  const messagesData = pages.flatMap((page) => [...page.data].reverse())

  useEffect(() => {
    const el = scrollRef?.current
    if (!el || isFetchingNextPage || !hasNextPage) return

    if (el.scrollHeight <= el.clientHeight + 100) {
      fetchNextPage()
    }
  }, [pages.length, hasNextPage, isFetchingNextPage, fetchNextPage, scrollRef])

  useEffect(() => {
    const el = scrollRef?.current
    if (!el || isLoading || hasScrolledInitially.current) return

    const timeout = setTimeout(() => {
      scrollToBottom()
      hasScrolledInitially.current = true
    }, 100)

    return () => clearTimeout(timeout)
  }, [pages.length, isLoading, scrollRef, scrollToBottom])

  const handleScroll = () => {
    const el = scrollRef?.current
    if (!el || isFetchingNextPage || !hasNextPage) return

    if (el.scrollTop < 100) {
      fetchNextPage()
    }
  }

  return {
    messagesData,
    isLoading,
    handleScroll,
    isFetchingNextPage,
  }
}
