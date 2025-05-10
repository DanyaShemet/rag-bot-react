import { toast } from 'sonner'
import { AxiosError } from 'axios'

type Handler = (err: unknown) => void

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message || err.message
  }
  if (err instanceof Error) {
    return err.message
  }
  return 'Сталася помилка'
}

export function withDefaultErrorHandler(userHandler?: Handler): Handler {
  return (err: unknown) => {
    const message = getErrorMessage(err)

    toast.error(message)

    if (userHandler) {
      userHandler(message)
    }
  }
}
