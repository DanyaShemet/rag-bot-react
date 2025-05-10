import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { withDefaultErrorHandler } from '@/helpers/error-handler'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('✅ Вхід успішний!')
      navigate('/')
    },
    onError: withDefaultErrorHandler(),
  })
}
