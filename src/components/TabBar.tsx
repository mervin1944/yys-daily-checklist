import type { TaskCategory } from '../db/db'

const TABS: { key: TaskCategory; label: string }[] = [
  { key: 'daily', label: '每日' },
  { key: 'weekly', label: '每周' },
  { key: 'event', label: '活动' },
]

export function TabBar({ active, onChange }: { active: TaskCategory; onChange: (c: TaskCategory) => void }) {
  return (
    <div className="flex gap-2 rounded-lg bg-yys-panel p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
            active === tab.key ? 'bg-yys-accent2 text-white' : 'text-yys-accent/70 hover:text-yys-accent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
