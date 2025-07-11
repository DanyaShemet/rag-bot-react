self.onmessage = function (e) {
  const users = e.data
  const filtered = users
    .filter((u) => u.isActive)
    .sort((a, b) => new Date(b.registered) - new Date(a.registered))

  postMessage(filtered)
}
