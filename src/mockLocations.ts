export const locationData = {
  "東京都": ["新宿区", "渋谷区", "港区"],
  "大阪府": ["北区", "中央区", "天王寺区"],
  "福岡県": ["博多区", "中央区", "早良区"],
} as const;

export type Prefecture = keyof typeof locationData;
export type City = (typeof locationData)[Prefecture][number];
