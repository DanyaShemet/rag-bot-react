import { toast } from 'sonner'

type Handler = (err: unknown) => void

export const getErrorMessage = (err: any): string => {
 return err?.response?.data?.message || err?.message
}

export function withDefaultErrorHandler(userHandler?: Handler): Handler {
    return (err: any) => {
        const message = getErrorMessage(err) || 'Сталася помилка'
        toast.error(message)

        if (userHandler) {
            userHandler(message)
        }
    }
}
