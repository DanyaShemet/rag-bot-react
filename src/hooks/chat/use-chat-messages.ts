import { useInfiniteQuery } from '@tanstack/react-query'
import { getMessages } from '@/api/messages'
import { useEffect } from 'react'

export const useChatMessages = (chatId?: string, scrollRef?: React.RefObject<HTMLDivElement>) => {
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

  const pages = (messages?.pages ?? []).slice().reverse()
  const messagesData = pages.flatMap((page) => [...page.data].reverse())

  useEffect(() => {
    const el = scrollRef?.current
    if (!el || isFetchingNextPage || !hasNextPage) return

    if (el.scrollHeight <= el.clientHeight + 100) {
      fetchNextPage()
    }
  }, [pages.length, hasNextPage, isFetchingNextPage, fetchNextPage])

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
