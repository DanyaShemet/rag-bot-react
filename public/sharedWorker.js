const connections = []
let socket

function initWebSocket() {
  socket = new WebSocket('wss://echo.websocket.org') // тестовий сервер

  socket.onopen = () => {
    console.log('[Worker] WebSocket connected')
  }

  socket.onmessage = (event) => {
    console.log('[Worker] Received from server:', event.data)
    // Транслюємо всім вкладкам
    connections.forEach((port) => {
      port.postMessage({ type: 'server', data: event.data })
    })
  }

  socket.onclose = () => {
    console.log('[Worker] WebSocket closed')
  }

  socket.onerror = (e) => {
    console.error('[Worker] WebSocket error', e)
  }
}

onconnect = function (e) {
  const port = e.ports[0]
  connections.push(port)
  console.log('[Worker] New tab connected')

  if (!socket || socket.readyState > 1) {
    initWebSocket() // відкриваємо тільки один раз
  }

  port.onmessage = function (event) {
    const { type, data } = event.data

    if (type === 'client') {
      console.log('[Worker] Message from tab:', data)
      socket.send(data) // пересилаємо на сервер
    }
  }

  port.start()
}
