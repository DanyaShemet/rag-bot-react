import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  isActive: boolean
  registered: string
}

const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    isActive: Math.random() > 0.5,
    registered: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))
}

export default function WorkerExample() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const worker = new Worker(new URL('../../public/myWorker.js', import.meta.url))
    const users = generateFakeUsers(100000) // багато користувачів

    setLoading(true)
    worker.postMessage(users)

    worker.onmessage = (e) => {
      setFilteredUsers(e.data)
      setLoading(false)
      worker.terminate()
    }

    return () => {
      worker.terminate()
    }
  }, [])

  return (
    <div>
      <h2>Filtered Users (Active, Sorted):</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} – {user.registered}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
