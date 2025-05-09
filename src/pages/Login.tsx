import {FormEvent, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useLogin} from "../services/mutations/use-login.ts";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const {
        mutate: loginUser,
        isPending,
        isError,
    } = useLogin()

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        loginUser({ email, password })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center text-indigo-600">Вхід</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

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
