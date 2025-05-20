import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import BotList from './pages/BotList'
import Documents from './pages/Documents'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Bot from '@/pages/Bot'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BotList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:id"
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
