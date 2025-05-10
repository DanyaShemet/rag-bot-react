import { useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/mutations/use-register'
import { SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form'
import { EMAIL_PATTERN } from '@/constants/validations/email'
import { PASSWORD_VALIDATION } from '@/constants/validations/password'
import { AppErrorText } from '@/components/ui/AppErrorText'
import { Login } from '@/models/request/login'

export default function Register() {
  const navigate = useNavigate()

  const { mutate: registerUser, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>()

  const onSubmit: SubmitHandler<Login> = ({ email, password }: Login) => {
    registerUser({ email, password })
  }

  const emailValidation: UseFormRegisterReturn = register('email', {
    required: 'Введіть email',
    ...EMAIL_PATTERN,
  })

  const passwordValidation: UseFormRegisterReturn = register('password', {
    required: 'Введіть пароль',
    ...PASSWORD_VALIDATION,
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Реєстрація</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            {...emailValidation}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && <AppErrorText error={errors.email.message ?? ''} />}

          <input
            type="password"
            placeholder="Пароль"
            {...passwordValidation}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && <AppErrorText error={errors.password?.message ?? ''} />}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {isPending ? 'Реєстрація...' : 'Зареєструватися'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition"
          >
            Назад до входу
          </button>
        </form>
      </div>
    </div>
  )
}
