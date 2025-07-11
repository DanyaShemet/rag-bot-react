import { FormEvent } from 'react'

interface ChatInputFormProps {
  question: string
  onChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  isPending: boolean
}

export function ChatInputForm({ question, onChange, onSubmit, isPending }: ChatInputFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 flex gap-2 bg-white border-t">
      <textarea
        value={question}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Напишіть запитання..."
        rows={2}
        className="flex-1 resize-none p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={!question || isPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending ? '...' : '➤'}
      </button>
    </form>
  )
}
