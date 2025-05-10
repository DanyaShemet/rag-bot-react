import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDocuments, deleteDocument } from '@/api/documents'
import { toast } from 'sonner'
import AppHeader from '@/components/ui/AppHeader'
import { getErrorMessage, withDefaultErrorHandler } from '@/helpers/error-handler'
import { useEffect } from 'react'

export default function Documents() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })

  const { mutate: removeDocument, isPending: isDeleting } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success('Документ видалено')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: withDefaultErrorHandler(),
  })

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [isError, error])

  return (
    <>
      <AppHeader />
      <main className="p-4 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">📚 Ваші документи</h1>

        {isLoading && <p>⏳ Завантаження...</p>}
        {isError && <p className="text-red-500">❌ Сталася помилка при завантаженні</p>}

        {!isLoading && data?.length === 0 && (
          <p className="text-gray-500">У вас ще немає завантажених документів.</p>
        )}

        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((doc) => (
              <li
                key={doc._id}
                className="bg-white border rounded px-4 py-2 flex justify-between items-center"
              >
                <span className="truncate">{doc.fileName}</span>
                <div className="flex gap-2">
                  <a href={doc.fileUrl} target="_blank" className="text-blue-600 hover:underline">
                    Завантажити
                  </a>
                  <button
                    disabled={isDeleting}
                    onClick={() => removeDocument(doc._id)}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    Видалити
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
