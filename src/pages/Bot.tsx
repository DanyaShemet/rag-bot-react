import AppHeader from '@/components/ui/AppHeader'
import ChatForm from '@/components/ChatForm'
import PdfUploader from '@/components/PdfUploader'

export default function Bot() {
  return (
    <>
      <AppHeader />
      <main className="p-4 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">GPT-RAG Бот</h1>
        <ChatForm />
        <PdfUploader />
      </main>
    </>
  )
}
