export function ChatItem({
  id,
  title,
  isPendingDelete,
  onOpen,
  onDelete,
}: {
  id: string
  title: string
  isPendingDelete?: boolean
  onOpen: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <li className="bg-white border rounded px-4 py-2 flex justify-between items-center">
      <span className="truncate">{title}</span>
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:underline disabled:opacity-50"
          onClick={() => onOpen(id)}
        >
          Відкрити
        </button>
        <button
          className="text-red-600 hover:underline disabled:opacity-50"
          onClick={() => onDelete(id)}
        >
          {isPendingDelete ? 'Видалення...' : 'Видалити'}
        </button>
      </div>
    </li>
  )
}
