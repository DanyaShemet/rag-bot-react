import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
