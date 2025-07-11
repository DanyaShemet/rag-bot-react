import { useCallback } from 'react'

export const useScrollToBottom = (scrollRef?: React.RefObject<HTMLDivElement | null>) => {
  const scrollToBottom = useCallback(() => {
    const el = scrollRef?.current
    console.log('scrollToBottom called', el)
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [scrollRef])

  return {
    scrollToBottom,
  }
}
