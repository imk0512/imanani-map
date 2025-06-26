# いま◯◯してる人マップ（仮）

「今この瞬間、誰かが何をしているか」を地図で見ることができる、リアルタイム可視化Webアプリです。ユーザーは「今何をしているか」を投稿し、その内容が地図上に反映されます。

## 機能一覧

- プリセットから「いま◯◯してる」を選択して投稿
- 自由記述メッセージ（15文字まで）を添えて状態を共有
- 位置情報は自動取得、取得できない場合は手動入力
- 地図上にリアルタイムで他ユーザーの状態が反映
- 投稿は30分で自動的に非表示
- 初回アクセス時に位置情報使用に関する同意を取得

## 使用技術

- フロントエンド：Next.js (TypeScript)
- 地図表示：Leaflet.js（React Leaflet）
- UI：Tailwind CSS
- バックエンド：Firebase Firestore
- Hosting：Firebase Hosting
- その他：Geolocation API、LocalStorage

## ディレクトリ構成（概要）

```
src/
├── components/
├── features/
│   ├── post/
│   ├── map/
│   └── location/
├── lib/
├── constants/
├── types/
├── pages/
│   └── index.tsx
```

## ローカル開発手順

1. リポジトリをクローン：

```bash
git clone https://github.com/your-username/imanani-map.git
cd imanani-map
```

2. 環境変数ファイルを設定：

```bash
cp .env.local.example .env.local
# Firebase の APIキーなどを記入
```

3. 依存関係をインストール：

```bash
npm install
```

4. 開発サーバー起動：

```bash
npm run dev
```

## 今後の展望（Optional）

- 投稿ヒートマップの導入
- 投稿ランキング（人気状態）
- ユーザー認証による記録機能

## ライセンス・注意事項

- 本アプリは実験的に開発されたものであり、位置情報などの個人情報は投稿時のみに利用されます。
- 投稿内容に不適切な言葉が含まれる場合、今後フィルタリング処理が導入される予定です。

