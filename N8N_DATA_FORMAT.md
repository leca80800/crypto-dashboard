# n8n日報データフォーマット

## ファイル命名規則
`dashboard/data/n8n-reports/YYYY-MM-DD.json`

例：`2026-02-11.json`

---

## JSON構造

```json
{
  "date": "2026-02-11",
  "summary": {
    "profit": 2340,           // 当日利益（円）
    "trades": 8,              // 取引回数
    "winRate": 0.75           // 勝率（0-1）
  },
  "trades": [
    {
      "time": "23:45",        // HH:MM形式
      "pair": "BTC/JPY",      // 通貨ペア
      "type": "sell",         // "buy" or "sell"
      "price": 15234500,      // 価格（整数）
      "amount": 0.001,        // 数量
      "profit": 450           // 損益（円、null可）
    }
    // ... 他の取引
  ],
  "status": {
    "binance": "ok",          // "ok", "warning", "error"
    "bitflyer": "ok",
    "avgLatency": 250         // 平均API応答時間（ms）
  },
  "notes": "任意のメモ（オプション）"
}
```

---

## 必須フィールド
- `date`: YYYY-MM-DD形式の日付文字列
- `summary.profit`: 数値（マイナス可）
- `summary.trades`: 整数
- `summary.winRate`: 0-1の小数
- `trades`: 配列（空配列可）
- `status`: オブジェクト

---

## オプションフィールド
- `trades[].profit`: 未確定の場合は `null`
- `notes`: 特記事項があれば

---

## 更新タイミング
- **毎日0時**に前日分を作成
- ファイル名は前日の日付

---

## 参考
`dashboard/data/sample-data.json` の `n8n` セクションを参照してください。