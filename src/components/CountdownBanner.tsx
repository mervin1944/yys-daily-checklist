import { getNextDailyReset, getNextWeeklyReset, formatCountdown } from '../lib/resetCycle'
import { useCountdown } from '../lib/useCountdown'

export function CountdownBanner() {
  const dailyRemaining = useCountdown(() => getNextDailyReset(new Date()))
  const weeklyRemaining = useCountdown(() => getNextWeeklyReset(new Date()))

  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg bg-yys-panel p-3 text-center text-sm">
      <div>
        <div className="text-yys-accent/70">距每日重置</div>
        <div className="font-mono text-base text-yys-accent">{formatCountdown(dailyRemaining)}</div>
      </div>
      <div>
        <div className="text-yys-accent/70">距每周重置</div>
        <div className="font-mono text-base text-yys-accent">{formatCountdown(weeklyRemaining)}</div>
      </div>
    </div>
  )
}
