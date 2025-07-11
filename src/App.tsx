import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import BotList from './pages/BotList'
import Documents from './pages/Documents'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Worker from './pages/Worker'
import SharedWorkerExample from './pages/SharedWorkerExample'
import ServiceWorker from './pages/ServiceWorker'
import ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Bot from '@/pages/Bot'

import { registerSW } from 'virtual:pwa-register'

export default function App() {
  registerSW({
    onNeedRefresh() {
      console.log('🟡 New version available')
    },
    onOfflineReady() {
      console.log('✅ Ready to work offline')
    },
  })

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
      <Route path="/worker" element={<Worker />} />
      <Route path="/shared-worker" element={<SharedWorkerExample />} />
      <Route path="/service-worker" element={<ServiceWorker />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
