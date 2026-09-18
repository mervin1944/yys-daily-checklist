import { useState } from 'react'
import type { TaskCategory, TaskRecord } from '../db/db'

interface Props {
  category: TaskCategory
  initialTask: TaskRecord | null
  onClose: () => void
  onSubmit: (values: { title: string; note?: string; eventDeadline?: number }) => void
}

function toDatetimeLocal(ms?: number) {
  if (!ms) return ''
  const d = new Date(ms)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function TaskEditorModal({ category, initialTask, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [note, setNote] = useState(initialTask?.note ?? '')
  const [eventDeadline, setEventDeadline] = useState(toDatetimeLocal(initialTask?.eventDeadline))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      note: note.trim() || undefined,
      eventDeadline: category === 'event' && eventDeadline ? new Date(eventDeadline).getTime() : undefined,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg bg-yys-panel p-5">
        <h2 className="text-lg font-semibold text-yys-accent">{initialTask ? '编辑任务' : '新增任务'}</h2>
        <div>
          <label className="mb-1 block text-sm text-white/70">任务名称</label>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-yys-bg px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-yys-accent2"
            placeholder="例如:悬赏封印"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">备注(可选)</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-md bg-yys-bg px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-yys-accent2"
          />
        </div>
        {category === 'event' && (
          <div>
            <label className="mb-1 block text-sm text-white/70">截止时间(可选)</label>
            <input
              type="datetime-local"
              value={eventDeadline}
              onChange={(e) => setEventDeadline(e.target.value)}
              className="w-full rounded-md bg-yys-bg px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-yys-accent2"
            />
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm text-white/60 hover:text-white">
            取消
          </button>
          <button type="submit" className="rounded-md bg-yys-accent2 px-4 py-2 text-sm font-medium text-white">
            保存
          </button>
        </div>
      </form>
    </div>
  )
}
