import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/api/auth'
import AppHeader from '@/components/ui/AppHeader'
import { getErrorMessage } from '@/helpers/error-handler'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Profile() {
  const { isError, data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getMe,
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
        <h1 className="text-2xl font-bold">👤 Профіль</h1>

        {isLoading && <p>⏳ Завантаження...</p>}

        {data && (
          <div className="bg-white border p-4 rounded shadow">
            <p className="text-gray-700">
              <strong>Email:</strong> {data.email}
            </p>
          </div>
        )}
      </main>
    </>
  )
}
