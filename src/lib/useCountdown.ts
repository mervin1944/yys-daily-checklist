import { useEffect, useState } from 'react'

/**
 * 每秒重新计算一次剩余毫秒数。targetFn 每次都会重新求值,
 * 这样跨过重置时间点之后能自动算出"下一次"重置,而不会卡在 00:00:00。
 */
export function useCountdown(targetFn: () => Date): number {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetFn().getTime() - Date.now()))

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, targetFn().getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return remaining
}
