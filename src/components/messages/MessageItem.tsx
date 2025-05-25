import { Bot, User } from 'lucide-react'

export const MessageItem = ({ isUser, content }: { isUser: boolean; content: string }) => {
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center">
          <Bot size={16} />
        </div>
      )}
      <div
        className={`p-3 rounded-2xl max-w-xl ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {content}
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
          <User size={16} />
        </div>
      )}
    </div>
  )
}
