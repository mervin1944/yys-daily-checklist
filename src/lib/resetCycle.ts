// 阴阳师每日重置在服务器时间 5:00,每周重置在周一 5:00。
// 这里按玩家本机时间计算(国服玩家本机时间通常就是 UTC+8),
// 如果你所在时区和游戏服务器不一致,可以调整 RESET_HOUR。
export const RESET_HOUR = 5

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

/** 5:00 之前算作"游戏意义上的前一天",返回 YYYY-MM-DD */
export function getDailyCycleKey(date: Date, resetHour = RESET_HOUR): string {
  const shifted = new Date(date)
  shifted.setHours(shifted.getHours() - resetHour)
  return `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}`
}

/** 周一 5:00 之前算作"上一周",返回该周周一的 YYYY-MM-DD 作为 key */
export function getWeeklyCycleKey(date: Date, resetHour = RESET_HOUR): string {
  const shifted = new Date(date)
  shifted.setHours(shifted.getHours() - resetHour)
  // getDay(): 0=周日 ... 1=周一
  const day = shifted.getDay()
  const diffToMonday = day === 0 ? 6 : day - 1
  const monday = new Date(shifted)
  monday.setDate(shifted.getDate() - diffToMonday)
  return `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}-W`
}

/** 距离下一次每日重置(今天或明天的 resetHour:00:00) */
export function getNextDailyReset(date: Date, resetHour = RESET_HOUR): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate(), resetHour, 0, 0, 0)
  if (next.getTime() <= date.getTime()) {
    next.setDate(next.getDate() + 1)
  }
  return next
}

/** 距离下一次每周重置(下一个周一 resetHour:00:00) */
export function getNextWeeklyReset(date: Date, resetHour = RESET_HOUR): Date {
  const next = getNextDailyReset(date, resetHour)
  // 从 next(某天的 resetHour)开始往后找,直到落在周一
  while (next.getDay() !== 1) {
    next.setDate(next.getDate() + 1)
  }
  return next
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return days > 0 ? `${days}天 ${clock}` : clock
}
