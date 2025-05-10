import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export default function AppHeader() {
  const { logout } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/', label: '🧠 Бот' },
    { to: '/documents', label: '📚 Документи' },
    { to: '/profile', label: '👤 Профіль' },
  ]

  return (
    <header className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
      <nav className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:underline ${
              location.pathname === link.to ? 'font-bold underline' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-100 transition"
      >
        Вийти
      </button>
    </header>
  )
}
