# Google認証セットアップ手順

## 🔐 Google OAuth設定

ダッシュボードにGoogle認証を追加するための手順です。

---

## 📋 ステップ1：Google Cloud Projectの作成

1. **Google Cloud Console**にアクセス
   https://console.cloud.google.com/

2. **新しいプロジェクト作成**
   - プロジェクト名：「crypto-dashboard」など
   - 「作成」をクリック

---

## 📋 ステップ2：OAuth同意画面の設定

1. **左メニュー → 「APIとサービス」 → 「OAuth同意画面」**

2. **ユーザータイプ**：「外部」を選択

3. **アプリ情報入力**：
   - アプリ名：「仮想通貨統合ダッシュボード」
   - ユーザーサポートメール：あなたのGmail
   - デベロッパー連絡先：あなたのGmail

4. **スコープ**：デフォルトのまま（email, profile）

5. **テストユーザー追加**：
   - leca80800@gmail.com
   - klryon714@gmail.com

6. 「保存して次へ」で完了

---

## 📋 ステップ3：OAuth クライアントIDの作成

1. **左メニュー → 「認証情報」**

2. **「認証情報を作成」 → 「OAuthクライアントID」**

3. **アプリケーションの種類**：「ウェブアプリケーション」

4. **承認済みのJavaScript生成元**：
   ```
   https://leca80800.github.io
   ```

5. **承認済みのリダイレクトURI**：
   ```
   https://leca80800.github.io/crypto-dashboard/
   ```

6. **「作成」**をクリック

7. **クライアントIDをコピー**
   - 形式：`123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`

---

## 📋 ステップ4：ダッシュボードにClient IDを設定

1. **`auth.js`を開く**

2. **以下の行を編集**：
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
   ```
   
   ↓
   
   ```javascript
   const GOOGLE_CLIENT_ID = '取得したクライアントID';
   ```

3. **保存してGitHubにプッシュ**：
   ```bash
   cd /Users/leca/.openclaw/workspace-crypto/dashboard
   git add .
   git commit -m "Google認証追加 + Client ID設定"
   git push
   ```

---

## ✅ 完了確認

1. **ダッシュボードにアクセス**：
   https://leca80800.github.io/crypto-dashboard/

2. **Googleログインボタンが表示される**

3. **許可されたアカウントでログイン**
   - leca80800@gmail.com
   - klryon714@gmail.com

4. **ダッシュボード表示**

---

## 🔧 トラブルシューティング

### ログインボタンが表示されない
- ブラウザのコンソールでエラー確認
- Client IDが正しいか確認
- 承認済みURIが正しいか確認

### 「このアプリは認証されていません」エラー
- OAuth同意画面のテストユーザーに追加されているか確認

### 認証後に403エラー
- ALLOWED_EMAILS配列にメールアドレスが含まれているか確認

---

## 📝 セキュリティ注意事項

- Client IDは公開されても安全（秘密鍵ではない）
- ALLOWED_EMAILS配列でアクセス制御
- 本番環境では「公開」状態に変更推奨（現在はテストモード）

---

**設定完了後、このファイルは削除しても構いません。**
