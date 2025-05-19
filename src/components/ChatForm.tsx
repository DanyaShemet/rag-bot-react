import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { askChat } from '@/api/chat'
import { getErrorMessage, withDefaultErrorHandler } from '@/helpers/error-handler'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChatForm({ chatId }: { chatId: string | undefined }) {
  const [question, setQuestion] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { mutate, isPending, isSuccess, data, error, isError } = useMutation({
    mutationFn: askChat,
    onError: withDefaultErrorHandler(),
  })

  useEffect(() => {
    if (isError) {
      setErrorMessage(getErrorMessage(error))
    }
  }, [isError, error])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    mutate(question)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Напишіть запитання до PDF..."
        rows={4}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        disabled={!question || isPending}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending ? 'Відправка...' : 'Надіслати'}
      </button>

      {isError && <p className="text-red-500">❌ {errorMessage}</p>}

      {isSuccess && (
        <div className="bg-gray-100 p-4 rounded">
          <strong>🤖 GPT:</strong>
          <p>{data?.reply}</p>
        </div>
      )}
    </form>
  )
}
