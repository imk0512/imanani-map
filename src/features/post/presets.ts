export const PRESETS = [
  '🛋️ だらけ中',
  '☕ カフェ中',
  '🚶‍♀️ 散歩中',
  '🎮 ゲーム中',
  '🛏️ 寝ようとしてる',
  '📖 読書中',
  '📚 勉強中',
  '🧘‍♀️ 瞑想中',
  '✍️ 仕事中',
] as const;

export type Preset = typeof PRESETS[number];
