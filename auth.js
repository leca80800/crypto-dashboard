// Google OAuth 設定
const ALLOWED_EMAILS = [
    'leca80800@gmail.com',
    'klryon714@gmail.com'
];

// Google Client ID（後で設定）
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

let currentUser = null;

// 認証状態チェック
function checkAuth() {
    const user = localStorage.getItem('crypto_dashboard_user');
    if (!user) {
        showLoginPage();
        return false;
    }
    
    try {
        currentUser = JSON.parse(user);
        if (!ALLOWED_EMAILS.includes(currentUser.email)) {
            showUnauthorized();
            return false;
        }
        showDashboard();
        return true;
    } catch (e) {
        showLoginPage();
        return false;
    }
}

// ログインページ表示
function showLoginPage() {
    document.body.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <div id="g_id_onload"
                     data-client_id="${GOOGLE_CLIENT_ID}"
                     data-callback="handleCredentialResponse">
                </div>
                <div class="g_id_signin" data-type="standard"></div>
                <p class="auth-note">※ 許可されたユーザーのみ利用可能です</p>
            </div>
        </div>
    `;
}

// 未認可ユーザー表示
function showUnauthorized() {
    document.body.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <h1>🔒</h1>
                <p class="auth-description">アクセスが許可されていません</p>
                <button onclick="logout()" class="logout-btn">ログアウト</button>
            </div>
        </div>
    `;
}

// ダッシュボード表示
function showDashboard() {
    // 元のコンテンツを表示
    document.getElementById('dashboard-content').style.display = 'block';
    
    // ユーザー情報表示
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.innerHTML = `
        <span>${currentUser.email}</span>
        <button onclick="logout()" class="logout-btn-small">ログアウト</button>
    `;
    document.querySelector('header').appendChild(userInfo);
}

// Google認証レスポンス処理
function handleCredentialResponse(response) {
    const credential = response.credential;
    const payload = parseJwt(credential);
    
    if (ALLOWED_EMAILS.includes(payload.email)) {
        const user = {
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
        localStorage.setItem('crypto_dashboard_user', JSON.stringify(user));
        location.reload();
    } else {
        showUnauthorized();
    }
}

// JWT解析
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// ログアウト
function logout() {
    localStorage.removeItem('crypto_dashboard_user');
    location.reload();
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});
