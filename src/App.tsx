import { useEffect, useState } from 'react'
import type { TaskCategory } from './db/db'
import { useTaskStore } from './store/taskStore'
import { CountdownBanner } from './components/CountdownBanner'
import { TabBar } from './components/TabBar'
import { TaskList } from './components/TaskList'

export default function App() {
  const loaded = useTaskStore((s) => s.loaded)
  const init = useTaskStore((s) => s.init)
  const [tab, setTab] = useState<TaskCategory>('daily')

  useEffect(() => {
    init()
  }, [init])

  if (!loaded) {
    return <div className="flex min-h-screen items-center justify-center text-white/50">加载中...</div>
  }

  return (
    <div className="mx-auto min-h-screen max-w-md space-y-4 p-4 text-white">
      <header className="text-center">
        <h1 className="text-xl font-bold text-yys-accent">阴阳师每日待办</h1>
        <p className="text-xs text-white/40">数据仅保存在本机浏览器,不会上传到任何服务器</p>
      </header>
      <CountdownBanner />
      <TabBar active={tab} onChange={setTab} />
      <TaskList category={tab} />
    </div>
  )
}
