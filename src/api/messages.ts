import { api } from '@/api/index'
import { MessagesRO } from '@/models/response/messages'

export const getMessages = async ({
  chatId,
  page = 1,
  perPage = 5,
}: {
  chatId: string
  page?: number
  perPage?: number
}): Promise<MessagesRO> => {
  const res = await api.get(`/messages/${chatId}`, {
    params: { page, perPage },
  })

  const { data, meta } = res.data

  const hasMore = page * perPage < meta.total

  return {
    data,
    nextPage: hasMore ? page + 1 : undefined,
  }
}
