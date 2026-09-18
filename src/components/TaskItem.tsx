import type { TaskRecord } from '../db/db'

interface Props {
  task: TaskRecord
  checked: boolean
  isFirst: boolean
  isLast: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  onMove: (direction: 'up' | 'down') => void
}

export function TaskItem({ task, checked, isFirst, isLast, onToggle, onEdit, onDelete, onMove }: Props) {
  const overdue = task.category === 'event' && task.eventDeadline !== undefined && task.eventDeadline < Date.now() && !checked

  return (
    <li
      className={`flex items-start gap-3 rounded-lg border border-white/5 bg-yys-panel/60 p-3 ${
        checked ? 'opacity-50' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 h-5 w-5 shrink-0 accent-yys-accent2"
      />
      <div className="min-w-0 flex-1">
        <div className={`truncate font-medium ${checked ? 'line-through' : ''}`}>{task.title}</div>
        {task.note && <div className="truncate text-xs text-white/50">{task.note}</div>}
        {task.category === 'event' && task.eventDeadline !== undefined && (
          <div className={`text-xs ${overdue ? 'text-red-400' : 'text-white/40'}`}>
            截止:{new Date(task.eventDeadline).toLocaleString()}
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 text-xs">
        <div className="flex gap-1">
          <button onClick={() => onMove('up')} disabled={isFirst} className="disabled:opacity-20" aria-label="上移">
            ▲
          </button>
          <button onClick={() => onMove('down')} disabled={isLast} className="disabled:opacity-20" aria-label="下移">
            ▼
          </button>
        </div>
        <div className="flex gap-2 text-white/50">
          <button onClick={onEdit} className="hover:text-yys-accent">
            编辑
          </button>
          <button onClick={onDelete} className="hover:text-red-400">
            删除
          </button>
        </div>
      </div>
    </li>
  )
}
