import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Bot from './pages/Bot'
import Documents from './pages/Documents'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute.tsx'

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Bot />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/documents"
                element={
                    <ProtectedRoute>
                        <Documents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
