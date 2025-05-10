import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/mutations/use-login'
import { SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form'
import { EMAIL_PATTERN } from '@/constants/validations/email'
import { PASSWORD_VALIDATION } from '@/constants/validations/password'
import { AppErrorText } from '@/components/ui/AppErrorText'
import { Login as ILogin } from '@/models/request/login'

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = ({ email, password }: ILogin) => {
    loginUser({ email, password })
  }

  const { mutate: loginUser, isPending } = useLogin()

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
        <h1 className="text-2xl font-bold text-center text-indigo-600">Вхід</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...emailValidation}
          />
          {errors.email && <AppErrorText error={errors.email.message ?? ''} />}

          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...passwordValidation}
          />
          {errors.password && <AppErrorText error={errors.password.message ?? ''} />}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {isPending ? 'Вхід...' : 'Увійти'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition"
          >
            Зареєструватися
          </button>
        </form>
      </div>
    </div>
  )
}
