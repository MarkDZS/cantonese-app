// ===================== UI Components =====================

// Ada (阿达) character
const AdaMessages = {
  login: '早晨！等你成日啦，今日学咗未？',
  complete_course: '又学完一课，听日返工即刻用得着！',
  practice_perfect: '满分？你系咪偷偷返咗香港office？',
  practice_bad: '未熟唔紧要，我陪你练多几次先见客。',
  practice_ok: '差少少啫，再试多次啦！',
  found_partner: '有搭子一齐学，进步快过坐lift！',
  challenge_win: '赢咗！听日请你食公司canteen！',
  challenge_lose: '输一次啫，下次实翻本！',
  long_time: '你去咗边啊？下个礼拜唔係要见客咩？',
  welcome: '早晨！%@nickname%，今日返工学咗未？',
  default: '做咩发呆啊？听日要同客开会啦！',
  assess_good: '哇，你评估成绩唔错喎！',
  assess_ok: '慢慢嚟，阿达陪你一步一步进步！',
  assess_beginner: '由零开始唔紧要，阿达带你飞！'
};

let adaTimer = null;

function showAda(message, duration = 5000) {
  const bubble = document.getElementById('ada-bubble');
  const text = document.getElementById('ada-text');
  
  if (adaTimer) clearTimeout(adaTimer);
  
  text.textContent = message;
  bubble.style.display = 'flex';
  bubble.style.animation = 'none';
  bubble.offsetHeight; // reflow
  bubble.style.animation = 'slideUp 0.5s ease';
  
  adaTimer = setTimeout(() => {
    bubble.style.display = 'none';
  }, duration);
}

function hideAda() {
  const bubble = document.getElementById('ada-bubble');
  bubble.style.display = 'none';
  if (adaTimer) clearTimeout(adaTimer);
}

// Format time
function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr + 'Z');
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;
  return date.toLocaleDateString('zh-CN');
}

// Get level label
function getLevelLabel(level) {
  const labels = ['未够班', '听得明少少', '勉强应付', '对答如流', '职场达人'];
  return labels[level - 1] || '未知';
}

// Get level icon
function getLevelIcon(level) {
  const icons = ['🌱', '🌿', '🌳', '🏆', '👑'];
  return icons[level - 1] || '📚';
}

// Create avatar HTML
function avatarHtml(user, size = '') {
  const initial = (user.nickname || '?')[0];
  return `<div class="avatar ${size}" style="background:${user.avatar_color || '#FF6B35'}">${initial}</div>`;
}

// Create level badge HTML
function levelBadgeHtml(level) {
  return `<span class="level-badge level-${level}">${getLevelIcon(level)} ${getLevelLabel(level)} L${level}</span>`;
}

// Show notification/toast
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    background: ${type === 'error' ? '#EF476F' : type === 'success' ? '#06D6A0' : '#118AB2'};
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    z-index: 400;
    animation: slideUp 0.3s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Show loading
function showLoading(container) {
  container.innerHTML = '<div class="loading"><div class="spinner"></div><p class="mt-16 text-muted">加载中...</p></div>';
}

// Show error
function showError(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">😢</div>
      <h3>出错了</h3>
      <p>${message || '请稍后再试'}</p>
      <button class="btn btn-primary mt-16" onclick="location.reload()">重试</button>
    </div>
  `;
}
