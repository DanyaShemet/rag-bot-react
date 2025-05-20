import AppHeader from '@/components/ui/AppHeader'
import { ChatList } from '@/components/chat/ChatList'

export default function BotList() {
  return (
    <>
      <AppHeader />
      <main className="p-4 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">GPT-RAG Бот</h1>
        <ChatList />
      </main>
    </>
  )
}
