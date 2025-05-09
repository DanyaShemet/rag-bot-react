
import { useMutation } from '@tanstack/react-query'
import { register } from '../../api/auth.ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {withDefaultErrorHandler} from "../../helpers/error-handler.ts";

export function useRegister() {
    const navigate = useNavigate()


    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success('🎉 Реєстрація успішна! Увійдіть у систему.')
            navigate('/login')
        },
        onError:  withDefaultErrorHandler(),
    })
}
