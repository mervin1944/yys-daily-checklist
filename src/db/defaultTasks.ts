import type { TaskCategory } from './db'

export interface DefaultTaskSeed {
  title: string
  category: TaskCategory
  note?: string
}

// 默认预置的常见每日/每周任务,仅作为初始模板——
// 游戏版本会持续更新副本内容,用户可以在"管理"页里自由增删改。
export const DEFAULT_TASKS: DefaultTaskSeed[] = [
  // 每日
  { title: '探索副本', category: 'daily', note: '消耗体力,记得清空体力上限' },
  { title: '御魂副本', category: 'daily', note: '刷取御魂培养式神' },
  { title: '御灵之战', category: 'daily', note: '打御灵获取觉醒材料' },
  { title: '契灵探索', category: 'daily', note: '契灵御魂/进阶材料' },
  { title: '悬赏封印', category: 'daily', note: '每日 2 次免费挑战' },
  { title: '结界卡获取', category: 'daily', note: '好友协力 + 每日免费次数' },
  { title: '寮任务', category: 'daily', note: '寮突破 / 寮商店代币' },
  { title: '好友体力', category: 'daily', note: '互相赠送与领取体力' },
  { title: '每日签到', category: 'daily' },
  { title: '斗技免费挑战', category: 'daily', note: '每日免费斗技次数' },
  // 每周
  { title: '斗技段位奖励', category: 'weekly', note: '记得领取每周段位结算奖励' },
  { title: '突破次数刷新确认', category: 'weekly', note: '御魂/结界卡突破次数是否用完' },
  { title: '周常礼盒', category: 'weekly', note: '成就点数 / 周常活跃度礼盒' },
  { title: '限时素材本', category: 'weekly', note: '本周开放的限时副本' },
]
