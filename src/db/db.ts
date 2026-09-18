import Dexie, { type Table } from 'dexie'

export type TaskCategory = 'daily' | 'weekly' | 'event'

export interface TaskRecord {
  id?: number
  title: string
  category: TaskCategory
  note?: string
  order: number
  createdAt: number
  /** daily/weekly 任务:最后一次勾选时所属的周期 key(见 resetCycle.ts),用于判断是否已跨周期自动清空 */
  lastDoneCycleKey?: string
  /** event 任务没有周期概念,直接记录是否完成 */
  done?: boolean
  /** event 任务的自定义截止时间(时间戳,毫秒),可选 */
  eventDeadline?: number
}

class ChecklistDB extends Dexie {
  tasks!: Table<TaskRecord, number>

  constructor() {
    super('yys-daily-checklist')
    this.version(1).stores({
      tasks: '++id, category, order',
    })
  }
}

export const db = new ChecklistDB()
