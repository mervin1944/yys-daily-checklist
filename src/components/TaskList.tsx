import { useState } from 'react'
import type { TaskCategory, TaskRecord } from '../db/db'
import { isTaskChecked, useTaskStore } from '../store/taskStore'
import { TaskItem } from './TaskItem'
import { TaskEditorModal } from './TaskEditorModal'

export function TaskList({ category }: { category: TaskCategory }) {
  const tasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const toggleTask = useTaskStore((s) => s.toggleTask)
  const moveTask = useTaskStore((s) => s.moveTask)

  const [editing, setEditing] = useState<TaskRecord | 'new' | null>(null)

  const categoryTasks = tasks.filter((t) => t.category === category).sort((a, b) => a.order - b.order)
  const now = new Date()

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {categoryTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            checked={isTaskChecked(task, now)}
            isFirst={index === 0}
            isLast={index === categoryTasks.length - 1}
            onToggle={() => toggleTask(task.id!)}
            onEdit={() => setEditing(task)}
            onDelete={() => deleteTask(task.id!)}
            onMove={(direction) => moveTask(task.id!, direction)}
          />
        ))}
        {categoryTasks.length === 0 && (
          <li className="rounded-lg border border-dashed border-white/10 p-6 text-center text-sm text-white/40">
            还没有任务,点下面按钮加一个吧
          </li>
        )}
      </ul>

      <button
        onClick={() => setEditing('new')}
        className="w-full rounded-lg border border-dashed border-yys-accent2/50 py-2 text-sm text-yys-accent2 hover:bg-yys-accent2/10"
      >
        + 添加任务
      </button>

      {editing !== null && (
        <TaskEditorModal
          category={category}
          initialTask={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSubmit={(values) => {
            if (editing === 'new') {
              addTask({ category, ...values })
            } else {
              updateTask(editing.id!, values)
            }
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}
