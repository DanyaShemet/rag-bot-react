import { useEffect, useRef, useState } from 'react'

export default function WebSocketClient() {
  const [logs, setLogs] = useState<string[]>([])
  const [input, setInput] = useState('')
  const portRef = useRef<MessagePort>(null)

  useEffect(() => {
    const worker = new SharedWorker('/sharedWorker.js')
    worker.port.start()
    portRef.current = worker.port

    worker.port.onmessage = (e) => {
      if (e.data.type === 'server') {
        setLogs((prev) => [...prev, `🔻 From server: ${e.data.data}`])
      }
    }

    return () => {
      worker.port.close()
    }
  }, [])

  const sendMessage = () => {
    if (portRef.current) {
      portRef.current.postMessage({ type: 'client', data: input })
      setLogs((prev) => [...prev, `🔼 You: ${input}`])
      setInput('')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Shared WebSocket Client</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send message" />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  )
}
