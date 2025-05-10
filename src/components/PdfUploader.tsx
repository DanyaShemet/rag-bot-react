import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { uploadPdf } from '@/api/upload'
import { getStatus, resetSession } from '@/api/status'
import { toast } from 'sonner'
import { getErrorMessage } from '@/helpers/error-handler'

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    data: statusData,
    refetch: refetchStatus,
    isLoading: statusLoading,
    isError: isStatusError,
    error: statusErrorRaw,
  } = useQuery({
    queryKey: ['status'],
    queryFn: getStatus,
  })

  useEffect(() => {
    if (isStatusError) {
      setErrorMessage(getErrorMessage(statusErrorRaw))
    }
  }, [isStatusError, statusErrorRaw])

  const uploadMutation = useMutation({
    mutationFn: uploadPdf,
    onSuccess: (res) => {
      toast.success(res.message || 'PDF завантажено')
      refetchStatus()
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })

  const resetMutation = useMutation({
    mutationFn: resetSession,
    onSuccess: () => {
      toast.success('Базу знань очищено')
      refetchStatus()
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })

  const handleUpload = () => {
    if (file) {
      uploadMutation.mutate(file)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">📎 Завантажити PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block"
      />

      <button
        disabled={!file || uploadMutation.isPending}
        onClick={handleUpload}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {uploadMutation.isPending ? 'Завантаження...' : 'Завантажити PDF'}
      </button>

      <button
        onClick={() => resetMutation.mutate()}
        className="text-sm text-red-600 hover:underline"
      >
        🗑 Скинути базу знань
      </button>

      {statusLoading && <p>⏳ Оновлення...</p>}
      {isStatusError && <p className="text-red-500">❌ {errorMessage}</p>}
      {statusData && (
        <p className="text-gray-600">📚 Фрагментів у базі знань: {statusData.count}</p>
      )}
    </div>
  )
}
