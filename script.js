// 最終更新時刻の表示
function updateLastUpdateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = formatted;
}

// チャート画像のフォールバック
function setupChartFallback() {
    const chartImg = document.getElementById('latestChart');
    if (chartImg) {
        chartImg.onerror = function() {
            this.parentElement.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 3v18h18"/>
                        <path d="M18 17V9"/>
                        <path d="M13 17V5"/>
                        <path d="M8 17v-3"/>
                    </svg>
                    <p style="color: var(--text-muted);">チャート画像を読み込み中...</p>
                </div>
            `;
        };
    }
}

// データ自動更新（実装時用）
async function fetchLatestData() {
    try {
        // TODO: 実際のデータソースに接続
        // const response = await fetch('/api/dashboard-data');
        // const data = await response.json();
        // updateDashboard(data);
        console.log('データ更新機能は未実装');
    } catch (error) {
        console.error('データ取得エラー:', error);
    }
}

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdateTime();
    setupChartFallback();
    
    // 1分ごとに更新時刻を更新
    setInterval(updateLastUpdateTime, 60000);
    
    // 5分ごとにデータを更新（実装時）
    // setInterval(fetchLatestData, 300000);
});

// アニメーション効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});