# 🪙 仮想通貨統合ダッシュボード

cryptopro（全自動取引）とcryptowatch（n8n監視）の活動を一元管理するダッシュボード。

## 📁 構成

```
dashboard/
├── index.html          # メインHTML
├── style.css           # スタイル（ダークテーマ＋アクセントカラー）
├── script.js           # インタラクション
├── data/
│   ├── charts/         # チャートスクリーンショット保存先
│   ├── n8n-reports/    # n8n日報JSON
│   └── cryptopro-logs/ # cryptopro分析ログJSON
└── README.md           # このファイル
```

## 🎨 デザインコンセプト

- **ダークトーン**: 長時間の監視に優しい目
- **アクセントカラー**: 青・緑・紫のグラデーション
- **シンプル構成**: 必要な情報だけ、無駄を削ぎ落とす
- **レスポンシブ**: モバイルでも確認可能

## 🔄 データ更新フロー

### 1. n8n自動取引データ
- **ソース**: cryptowatch エージェントが n8n から取得
- **更新頻度**: 毎日 0時（日報と同時）
- **保存形式**: `data/n8n-reports/YYYY-MM-DD.json`

### 2. cryptopro模擬取引データ
- **ソース**: cryptopro エージェントが分析実行
- **更新頻度**: 毎日 9時・15時・21時（4時間足チェック）
- **保存形式**: `data/cryptopro-logs/YYYY-MM-DD-HHMM.json`
- **チャート**: `data/charts/YYYY-MM-DD-HHMM.png`

### 3. ダッシュボード更新
- **タイミング**: 毎日 0時（全データまとめて）
- **通知**: WhatsAppにリンク送信

## 📊 データJSON形式

### n8n日報
```json
{
  "date": "2026-02-11",
  "summary": {
    "profit": 2340,
    "trades": 8,
    "winRate": 0.75
  },
  "trades": [
    {
      "time": "23:45",
      "pair": "BTC/JPY",
      "type": "sell",
      "price": 15234500,
      "amount": 0.001,
      "profit": 450
    }
  ],
  "status": {
    "binance": "ok",
    "bitflyer": "ok",
    "avgLatency": 250
  }
}
```

### cryptopro分析ログ
```json
{
  "timestamp": "2026-02-11T21:00:00+09:00",
  "pair": "BTC/JPY",
  "timeframe": "4h",
  "judgment": "buy",
  "confidence": 0.85,
  "price": 15180000,
  "indicators": {
    "rsi": 42,
    "macd": "golden_cross",
    "ma": "uptrend",
    "bollinger": "lower_bounce"
  },
  "reasoning": "4時間足で下降トレンドが終了し...",
  "plan": {
    "entry": 15180000,
    "target": 15550000,
    "stop": 15030000
  },
  "chartImage": "data/charts/2026-02-11-2100.png"
}
```

## 🚀 使い方

### ローカル表示
```bash
cd /Users/leca/.openclaw/workspace-crypto/dashboard
open index.html  # ブラウザで開く
```

### Web公開（オプション）
```bash
# GitHub Pagesへデプロイ
git init
git add .
git commit -m "Initial dashboard"
git remote add origin <your-repo>
git push -u origin main
# Settings → Pages → Source: main branch
```

### 自動更新スクリプト（TODO）
```bash
# cron or n8nワークフローで実行
node update-dashboard.js  # データを読み込んでHTMLを更新
```

## 🔧 カスタマイズ

### 色の変更
`style.css` の `:root` 変数を編集：
```css
:root {
    --accent-blue: #4a9eff;    /* メインアクセント */
    --accent-green: #00d9a3;   /* 利益・買い */
    --accent-red: #ff6b6b;     /* 損失・売り */
    /* ... */
}
```

### セクション追加
`index.html` の `<main>` 内に新しい `<section>` を追加。

## 📝 今後の実装

- [ ] リアルタイムデータ更新（WebSocket or polling）
- [ ] チャートの自動スクリーンショット取得
- [ ] パフォーマンスグラフ（Chart.js）
- [ ] フィルター機能（日付範囲・通貨ペア）
- [ ] エクスポート機能（CSV/PDF）

---

**作成**: cryptopro 🤖  
**更新**: 2026-02-11