import { create } from 'zustand'
import { db, type TaskCategory, type TaskRecord } from '../db/db'
import { DEFAULT_TASKS } from '../db/defaultTasks'
import { getDailyCycleKey, getWeeklyCycleKey } from '../lib/resetCycle'

interface TaskState {
  tasks: TaskRecord[]
  loaded: boolean
  init: () => Promise<void>
  addTask: (input: { title: string; category: TaskCategory; note?: string; eventDeadline?: number }) => Promise<void>
  updateTask: (id: number, patch: Partial<Omit<TaskRecord, 'id'>>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  toggleTask: (id: number) => Promise<void>
  moveTask: (id: number, direction: 'up' | 'down') => Promise<void>
}

async function reload(): Promise<TaskRecord[]> {
  return db.tasks.orderBy('order').toArray()
}

export function isTaskChecked(task: TaskRecord, now: Date): boolean {
  if (task.category === 'event') return Boolean(task.done)
  const currentKey = task.category === 'daily' ? getDailyCycleKey(now) : getWeeklyCycleKey(now)
  return task.lastDoneCycleKey === currentKey
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loaded: false,

  init: async () => {
    if (get().loaded) return
    const existing = await db.tasks.count()
    if (existing === 0) {
      const now = Date.now()
      await db.tasks.bulkAdd(
        DEFAULT_TASKS.map((seed, index) => ({
          ...seed,
          order: index,
          createdAt: now,
        })),
      )
    }
    set({ tasks: await reload(), loaded: true })
  },

  addTask: async ({ title, category, note, eventDeadline }) => {
    const maxOrder = get().tasks.reduce((max, t) => Math.max(max, t.order), -1)
    await db.tasks.add({
      title,
      category,
      note,
      eventDeadline,
      order: maxOrder + 1,
      createdAt: Date.now(),
    })
    set({ tasks: await reload() })
  },

  updateTask: async (id, patch) => {
    await db.tasks.update(id, patch)
    set({ tasks: await reload() })
  },

  deleteTask: async (id) => {
    await db.tasks.delete(id)
    set({ tasks: await reload() })
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return
    const now = new Date()
    const checked = isTaskChecked(task, now)
    if (task.category === 'event') {
      await db.tasks.update(id, { done: !checked })
    } else {
      const currentKey = task.category === 'daily' ? getDailyCycleKey(now) : getWeeklyCycleKey(now)
      await db.tasks.update(id, { lastDoneCycleKey: checked ? undefined : currentKey })
    }
    set({ tasks: await reload() })
  },

  moveTask: async (id, direction) => {
    const tasks = get().tasks
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    const sameCategory = tasks.filter((t) => t.category === task.category)
    const index = sameCategory.findIndex((t) => t.id === id)
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= sameCategory.length) return
    const other = sameCategory[swapIndex]
    await db.tasks.update(task.id!, { order: other.order })
    await db.tasks.update(other.id!, { order: task.order })
    set({ tasks: await reload() })
  },
}))
