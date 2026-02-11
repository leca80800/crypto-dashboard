# cryptopro分析ログデータフォーマット

## ファイル命名規則
`dashboard/data/cryptopro-logs/YYYY-MM-DD-HHMM.json`

例：`2026-02-11-2100.json`（21時の分析）

---

## JSON構造

```json
{
  "timestamp": "2026-02-11T21:00:00+09:00",  // ISO8601形式
  "pair": "BTC/JPY",                         // 通貨ペア
  "timeframe": "4h",                         // "1h", "4h", "1d" など
  "judgment": "buy",                         // "buy", "sell", "hold"
  "confidence": 0.85,                        // 信頼度（0-1）
  "price": 15180000,                         // 分析時点の価格
  "indicators": {
    "rsi": 42,                               // RSI値
    "macd": "golden_cross",                  // MACD状態（文字列で説明）
    "ma": "uptrend",                         // 移動平均の状態
    "bollinger": "lower_bounce"              // ボリンジャーバンドの状態
  },
  "reasoning": "4時間足で下降トレンドが終了し...", // 判断理由（テキスト）
  "plan": {
    "entry": 15180000,                       // エントリー価格
    "target": 15550000,                      // 利確目標
    "stop": 15030000                         // 損切りライン
  },
  "chartImage": "data/charts/2026-02-11-2100.png"  // チャート画像パス（相対）
}
```

---

## 必須フィールド
- `timestamp`: ISO8601形式（タイムゾーン付き）
- `pair`: 通貨ペア文字列
- `timeframe`: 時間足
- `judgment`: "buy" | "sell" | "hold"
- `confidence`: 0-1の小数
- `price`: 数値
- `indicators`: オブジェクト（内容は柔軟に）
- `reasoning`: 文字列（200字程度推奨）
- `plan`: エントリープラン（buy/sellの場合必須）

---

## オプションフィールド
- `chartImage`: チャート画像パス（なければnull）
- `plan`: judgmentが"hold"の場合はnull可

---

## 更新タイミング
- **毎日9時・15時・21時**の定時分析後
- エントリー前後の1時間足確認時も追加可

---

## チャート画像
- 保存先：`dashboard/data/charts/YYYY-MM-DD-HHMM.png`
- ブラウザスクリーンショットで取得
- 推奨サイズ：1280x720以上

---

## 参考
`dashboard/data/sample-data.json` の `cryptopro.latest` セクションを参照してください。