// ===================== App Router & State =====================
const App = {
  currentUser: null,
  currentPage: '',

  async init() {
    // Check if logged in
    try {
      this.currentUser = await API.getProfile();
      this.showApp();
      // Start challenge invitation polling
      this._startChallengePolling();
    } catch (e) {
      this.showLogin();
    }

    // Handle hash routing
    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  // ===================== Challenge Invitation Polling =====================
  _challengePollTimer: null,
  _knownChallengeIds: new Set(),
  _challengeModalShown: false,

  _startChallengePolling() {
    // Check invitations every 30 seconds
    this._challengePollTimer = setInterval(() => this._checkNewChallenges(), 30000);
    // Also check immediately
    setTimeout(() => this._checkNewChallenges(), 2000);
  },

  async _checkNewChallenges() {
    if (!this.currentUser || this._challengeModalShown) return;
    try {
      const invitations = await API.getChallengeInvitations();
      if (!invitations || invitations.length === 0) return;

      // Check for new (unseen) challenges
      const newOnes = invitations.filter(c => !this._knownChallengeIds.has(c.id));
      if (newOnes.length === 0) return;

      // Remember these challenge IDs
      newOnes.forEach(c => this._knownChallengeIds.add(c.id));
      
      // Show modal for the first new challenge
      this._showChallengeNotification(newOnes[0]);
    } catch (e) {
      // Silently ignore polling errors
    }
  },

  _showChallengeNotification(challenge) {
    this._challengeModalShown = true;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay challenge-notify-modal';
    modal.innerHTML = `
      <div class="modal">
        <div class="challenge-notify-icon">⚔️</div>
        <h3>对战邀请！</h3>
        <div class="challenger-info">
          ${avatarHtml({ nickname: challenge.challenger_name, avatar_color: challenge.challenger_avatar || '#FF6B35' }, 'avatar-sm')}
          <span style="font-weight:600;">${escapeHtml(challenge.challenger_name)}</span>
        </div>
        <p style="color:var(--text-light);margin-bottom:4px;">向你发起了一场对战</p>
        <div class="course-info">
          📚 ${escapeHtml(challenge.course_title)} (L${challenge.course_level})
        </div>
        <div class="challenge-notify-actions">
          <button class="btn btn-success" id="challenge-accept-btn">⚔️ 应战</button>
          <button class="btn btn-outline" id="challenge-wait-btn">⏳ 等一等</button>
          <button class="btn btn-danger" id="challenge-reject-btn">❌ 拒绝</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal handlers
    const closeModal = () => {
      modal.remove();
      this._challengeModalShown = false;
    };

    // Accept challenge
    modal.querySelector('#challenge-accept-btn').addEventListener('click', () => {
      closeModal();
      location.hash = `#/challenge/${challenge.id}`;
    });

    // Wait (dismiss for now, will check again later)
    modal.querySelector('#challenge-wait-btn').addEventListener('click', () => {
      closeModal();
      showToast('对战邀请已暂存，可在对战中心查看');
    });

    // Reject challenge
    modal.querySelector('#challenge-reject-btn').addEventListener('click', () => {
      closeModal();
      showToast('已拒绝对战邀请');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  },

  async route() {
    const hash = location.hash || '#/dashboard';
    const route = hash.replace('#', '');

    if (!this.currentUser) {
      this.showLogin();
      return;
    }

    this.currentPage = route;
    this.updateNav();

    switch (route) {
      case '/dashboard': await this.renderDashboard(); break;
      case '/courses': await this.renderCourses(); break;
      case '/assess': await this.renderAssessment(); break;
      case '/partners': await this.renderPartners(); break;
      case '/battles': await this.renderBattles(); break;
      case '/leaderboard': await this.renderLeaderboard(); break;
      case '/profile': await this.renderProfile(); break;
      default:
        if (route.startsWith('/course/') && route.includes('/practice')) {
          const courseId = route.split('/')[2];
          await this.renderPractice(courseId);
        } else if (route.startsWith('/course/')) {
          const courseId = route.split('/')[2];
          await this.renderCourseDetail(courseId);
        } else if (route.startsWith('/partner/')) {
          const partnerId = route.split('/')[2];
          await this.renderPartnerDetail(partnerId);
        } else if (route.startsWith('/challenge/')) {
          const challengeId = route.split('/')[2];
          await this.renderChallenge(challengeId);
        } else if (route.startsWith('/scenario-challenge/')) {
          const challengeId = route.split('/')[2];
          await this.renderScenarioChallenge(challengeId);
        } else {
          this.renderDashboard();
        }
    }
  },

  updateNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${this.currentPage}`) {
        link.classList.add('active');
      }
    });

    const navInfo = document.getElementById('nav-user-info');
    if (this.currentUser) {
      navInfo.innerHTML = `${avatarHtml(this.currentUser, 'avatar-sm')} <span>${this.currentUser.nickname}</span>`;
    }
  },

  showApp() {
    document.getElementById('navbar').style.display = 'flex';
    document.getElementById('main-content').innerHTML = '';
  },

  showLogin() {
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('main-content').innerHTML = '';
    this.renderLogin();
  },

  // ===================== LOGIN / REGISTER =====================
  renderLogin() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="login-container">
        <div class="login-card">
          <div class="login-logo">🦁</div>
          <div class="login-title">粤讲粤掂</div>
          <div class="login-subtitle">商务职场粤语学习搭子平台</div>
          
          <div id="login-form">
            <div class="form-group">
              <label class="form-label">用户名</label>
              <input type="text" id="login-username" class="form-input" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label class="form-label">密码</label>
              <input type="password" id="login-password" class="form-input" placeholder="请输入密码">
            </div>
            <div id="login-error" class="form-error" style="display:none;"></div>
            <button class="btn btn-primary btn-lg" style="width:100%;" onclick="App.handleLogin()">
              🦁 登录
            </button>
            <div class="form-toggle mt-16">
              还没有账号？<a onclick="App.showRegisterForm()">立即注册</a>
            </div>
            <div class="mt-16 text-muted" style="font-size:12px;">
              演示账号: demo / demo123
            </div>
          </div>

          <div id="register-form" style="display:none;">
            <div class="form-group">
              <label class="form-label">用户名 *</label>
              <input type="text" id="reg-username" class="form-input" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label class="form-label">密码 *</label>
              <input type="password" id="reg-password" class="form-input" placeholder="至少6位密码">
            </div>
            <div class="form-group">
              <label class="form-label">昵称 *</label>
              <input type="text" id="reg-nickname" class="form-input" placeholder="你的昵称">
            </div>
            <div class="form-group">
              <label class="form-label">职位</label>
              <input type="text" id="reg-position" class="form-input" placeholder="如：FICO顾问">
            </div>
            <div class="form-group">
              <label class="form-label">公司</label>
              <input type="text" id="reg-company" class="form-input" placeholder="如：越秀集团">
            </div>
            <div class="form-group">
              <label class="form-label">粤语基础</label>
              <select id="reg-base" class="form-select">
                <option value="none">零基础 - 完全不会</option>
                <option value="basic">能听懂几句</option>
                <option value="intermediate">能简单对话</option>
                <option value="fluent">流利</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">学习目标</label>
              <input type="text" id="reg-goal" class="form-input" placeholder="如：下个月外派香港">
            </div>
            <div id="reg-error" class="form-error" style="display:none;"></div>
            <button class="btn btn-primary btn-lg" style="width:100%;" onclick="App.handleRegister()">
              🚀 开始学习
            </button>
            <div class="form-toggle mt-16">
              已有账号？<a onclick="App.showLoginForm()">返回登录</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  },

  showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
  },

  async handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorEl = document.getElementById('login-error');

    if (!username || !password) {
      errorEl.textContent = '请填写用户名和密码';
      errorEl.style.display = 'block';
      return;
    }

    try {
      const data = await API.login({ username, password });
      App.currentUser = data.user;
      App.showApp();
      App.route();
      showAda(AdaMessages.login);
    } catch (e) {
      errorEl.textContent = e.message;
      errorEl.style.display = 'block';
    }
  },

  async handleRegister() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const nickname = document.getElementById('reg-nickname').value.trim();
    const position = document.getElementById('reg-position').value.trim();
    const company = document.getElementById('reg-company').value.trim();
    const baseCantonese = document.getElementById('reg-base').value;
    const learningGoal = document.getElementById('reg-goal').value.trim();
    const errorEl = document.getElementById('reg-error');

    if (!username || !password || !nickname) {
      errorEl.textContent = '请填写必填项';
      errorEl.style.display = 'block';
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = '密码至少6位';
      errorEl.style.display = 'block';
      return;
    }

    try {
      await API.register({ username, password, nickname, baseCantonese, learningGoal, position, company });
      const data = await API.login({ username, password });
      App.currentUser = data.user;
      App.showApp();
      // New user -> go to assessment
      location.hash = '#/assess';
      showAda('早晨！先嚟做个评估，睇下你嘅粤语水平先！');
    } catch (e) {
      errorEl.textContent = e.message;
      errorEl.style.display = 'block';
    }
  },

  // ===================== DASHBOARD =====================
  async renderDashboard() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const [profile, stats, feed, recommended, partnersData] = await Promise.all([
        API.getProfile(),
        API.getStats(),
        API.getFeed(),
        API.getRecommendedCourses(),
        API.getPartners()
      ]);

      const acceptedPartners = partnersData.filter(p => p.status === 'accepted');
      const now = new Date();
      const ONLINE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

      // Build partner avatars with online/offline status
      let partnersHtml = '';
      if (acceptedPartners.length > 0) {
        const avatars = acceptedPartners.map(p => {
          let lastActive = null;
          try { lastActive = new Date(p.last_active + 'Z'); } catch(e) {}
          const isOnline = lastActive && (now - lastActive) < ONLINE_THRESHOLD;
          const onlineClass = isOnline ? 'partner-avatar-online' : 'partner-avatar-offline';
          const dotClass = isOnline ? 'online-dot' : 'offline-dot';
          const tooltip = isOnline ? '在线' : '离线';
          return `
            <div class="partner-avatar-item ${onlineClass}" onclick="location.hash='#/partner/${p.id}'" title="${escapeHtml(p.nickname)} - ${tooltip}">
              <div class="avatar" style="background:${p.avatar_color || '#FF6B35'}">${(p.nickname || '?')[0]}</div>
              <span class="${dotClass}"></span>
              <span class="partner-avatar-name">${escapeHtml(p.nickname)}</span>
            </div>`;
        }).join('');
        partnersHtml = `
          <div class="card mb-16">
            <div class="partner-avatars-header">
              <span class="partner-avatars-title">🤝 学习搭子</span>
              <a href="#/partners" style="font-size:13px;">全部搭子 →</a>
            </div>
            <div class="partner-avatars-row">${avatars}</div>
          </div>`;
      }

      const completedPercent = stats.coursesTotal > 0 
        ? Math.round((stats.coursesCompleted / stats.coursesTotal) * 100) 
        : 0;

      main.innerHTML = `
        <div class="page-title">👋 早晨，${profile.nickname}！</div>
        
        <div class="dashboard-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <h3>${stats.coursesCompleted}/${stats.coursesTotal}</h3>
              <p>已学课程</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <h3>${stats.totalScore}</h3>
              <p>累计积分</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${getLevelIcon(profile.level)}</div>
            <div class="stat-info">
              <h3>${getLevelLabel(profile.level)} L${profile.level}</h3>
              <p>当前等级</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🤝</div>
            <div class="stat-info">
              <h3>${profile.partnerCount}</h3>
              <p>学习搭子</p>
            </div>
          </div>
        </div>

        ${partnersHtml}

        <div class="card mb-16">
          <div class="card-header">
            <span class="card-title">🎯 推荐课程</span>
            <a href="#/courses" style="font-size:13px;">查看全部 →</a>
          </div>
          <div id="recommended-courses">
            ${recommended.courses.length === 0 
              ? `<div class="empty-state"><p>暂无推荐课程，去评估一下你的水平吧！</p>
                 <a href="#/assess" class="btn btn-primary mt-16">开始评估</a></div>`
              : recommended.courses.slice(0, 4).map(c => courseCardHtml(c)).join('')
            }
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">📡 搭子动态</span>
          </div>
          ${feed.length === 0
            ? `<div class="empty-state">
                <div class="empty-icon">🤝</div>
                <h3>还没有动态</h3>
                <p>添加学习搭子，一起学粤语！</p>
                <a href="#/partners" class="btn btn-primary mt-16">找搭子</a>
               </div>`
            : feed.slice(0, 10).map(f => feedItemHtml(f)).join('')
          }
        </div>

        <div class="mt-24 text-center">
          <a href="#/assess" class="btn btn-outline">📊 重新评估</a>
        </div>
      `;

      // Attach click events for recommended course cards in dashboard
      main.querySelectorAll('#recommended-courses .course-card').forEach(card => {
        card.addEventListener('click', () => {
          const courseId = card.dataset.courseId;
          location.hash = `#/course/${courseId}`;
        });
      });
    } catch (e) {
      showError(main, e.message);
    }
  },

  // ===================== COURSES =====================
  async renderCourses() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const courses = await API.getCourses();
      
      // Group by level
      const grouped = {};
      courses.forEach(c => {
        if (!grouped[c.level]) grouped[c.level] = [];
        grouped[c.level].push(c);
      });

      let html = `<div class="page-title">📚 课程中心</div>`;
      html += `<div class="page-subtitle">商务职场粤语，从入门到精通</div>`;

      for (let level = 1; level <= 5; level++) {
        if (!grouped[level]) continue;
        const levelCourses = grouped[level];
        const completed = levelCourses.filter(c => c.progress === 'completed').length;

        html += `
          <div class="card mb-16">
            <div class="card-header">
              <span class="card-title">${getLevelIcon(level)} ${getLevelLabel(level)} — L${level}</span>
              <span style="font-size:13px;color:var(--text-light);">${completed}/${levelCourses.length} 完成</span>
            </div>
            <div class="progress-bar mb-16">
              <div class="progress-fill" style="width:${Math.round((completed/levelCourses.length)*100)}%"></div>
            </div>
            ${levelCourses.map(c => courseCardHtml(c)).join('')}
          </div>
        `;
      }

      main.innerHTML = html;

      // Attach click events
      main.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
          const courseId = card.dataset.courseId;
          location.hash = `#/course/${courseId}`;
        });
      });
    } catch (e) {
      showError(main, e.message);
    }
  },

  // ===================== COURSE DETAIL =====================
  _course: null,
  _courseId: null,
  _currentModule: 0,
  _courseData: null,

  // Recording state
  _mediaRecorder: null,
  _recordedChunks: [],
  _recordingTarget: null,
  _speechRecognition: null,
  _recognitionResult: '',

  async renderCourseDetail(courseId) {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const course = await API.getCourse(courseId);
      this._course = course;
      this._courseId = courseId;
      this._currentModule = 0;

      // Parse content - support both old and new format
      const content = course.content;
      this._courseData = content;

      // Check if new format (has modules)
      const hasModules = content && content.modules && Array.isArray(content.modules);
      const moduleNames = hasModules
        ? content.modules.map(m => m.title || this._getModuleLabel(m.type))
        : ['情景引入', '核心词汇', '语法表达', '文化知识'];

      const totalModules = hasModules ? content.modules.length : 4;
      const levelLabels = ['未够班', '听得明少少', '勉强应付', '对答如流', '职场达人'];
      const duration = content.duration_minutes || 18;

      main.innerHTML = `
        <!-- Top Nav -->
        <div class="course-top-bar">
          <a href="#/courses" class="course-back-btn">← 返回</a>
          <div class="course-top-title">L${course.level} ${course.title}</div>
          <div class="course-progress-indicator">第1课/共6课</div>
        </div>

        <!-- Meta Info Bar -->
        <div class="course-meta-bar">
          <span class="course-meta-badge level-${course.level}">🌱 ${levelLabels[course.level - 1] || 'L' + course.level} L${course.level}</span>
          <span class="course-meta-badge">⭐ 难度</span>
          <span class="course-meta-badge">⏱ 预计${duration}分钟</span>
          ${course.progress === 'completed' ? `<span class="course-meta-badge status-completed">✅ 已完成 得分:${course.score}%</span>` : ''}
        </div>

        <!-- Module Navigation Tabs -->
        <div class="course-module-tabs" id="course-module-tabs">
          ${moduleNames.map((name, i) => `
            <button class="course-module-tab ${i === 0 ? 'active' : ''}" data-idx="${i}">
              ${i === 0 ? '🎬' : i === 1 ? '📝' : i === 2 ? '📖' : i === 3 ? '💡' : '✏️'} ${name}
            </button>
          `).join('')}
        </div>

        <!-- Content Area -->
        <div id="course-module-content" class="course-module-content"></div>

        <!-- Bottom Action Bar -->
        <div class="course-bottom-bar">
          <button class="btn btn-outline" id="course-prev-btn" onclick="App.prevModule()" disabled>← 上一步</button>
          <span id="course-step-indicator">1 / ${totalModules}</span>
          <button class="btn btn-primary" id="course-next-btn" onclick="App.nextModule()">
            ${totalModules > 1 ? '下一步 →' : '完成课程'}
          </button>
          <button class="btn btn-success" id="course-complete-btn" style="display:none;" onclick="App.finishCourse()">
            🎉 完成课程
          </button>
        </div>
      `;

      // Render first module
      this.renderModule(0);

      // Attach tab click handlers
      document.querySelectorAll('.course-module-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const idx = parseInt(tab.dataset.idx);
          this.switchModule(idx);
        });
      });

      // Start course tracking
      if (course.progress !== 'completed') {
        await API.startCourse(courseId);
      }

    } catch (e) {
      showError(main, e.message);
    }
  },

  _getModuleLabel(type) {
    const labels = { dialogue: '情景引入', vocabulary: '核心词汇', grammar: '语法表达', culture: '文化知识', practice: '即时练习' };
    return labels[type] || type;
  },

  switchModule(index) {
    this._currentModule = index;
    this.renderModule(index);

    // Update tabs
    document.querySelectorAll('.course-module-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    // Update bottom bar
    const total = (this._courseData?.modules || []).length || 4;
    const isLast = index >= total - 1;
    document.getElementById('course-prev-btn').disabled = index === 0;
    document.getElementById('course-next-btn').style.display = isLast ? 'none' : '';
    document.getElementById('course-complete-btn').style.display = isLast ? '' : 'none';
    document.getElementById('course-step-indicator').textContent = `${index + 1} / ${total}`;

    // Scroll to top of content
    document.getElementById('course-module-content').scrollIntoView({ behavior: 'smooth' });
  },

  nextModule() {
    const total = (this._courseData?.modules || []).length || 4;
    if (this._currentModule < total - 1) {
      this.switchModule(this._currentModule + 1);
    }
  },

  prevModule() {
    if (this._currentModule > 0) {
      this.switchModule(this._currentModule - 1);
    }
  },

  async finishCourse() {
    try {
      await API.completeCourse(this._courseId, 100);
      showToast('🎉 恭喜完成课程！');
      showAda(AdaMessages.complete_course);
      setTimeout(() => { location.hash = '#/courses'; }, 1500);
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  renderModule(index) {
    const container = document.getElementById('course-module-content');
    if (!container) return;

    const content = this._courseData;
    // If old format, render with legacy layout
    if (!content || !content.modules) {
      this._renderLegacyModule(container, content, index);
      return;
    }

    const module = content.modules[index];
    if (!module) return;

    switch (module.type) {
      case 'dialogue': this._renderDialogueModule(container, module); break;
      case 'vocabulary': this._renderVocabModule(container, module); break;
      case 'grammar': this._renderGrammarModule(container, module); break;
      case 'culture': this._renderCultureModule(container, module); break;
      case 'practice': this._renderPracticeModule(container, module); break;
      default: container.innerHTML = '<div class="empty-state"><p>暂无内容</p></div>';
    }
  },

  _renderLegacyModule(container, content, index) {
    // Fallback for old format courses
    if (!content) { container.innerHTML = '<div class="empty-state"><p>暂无内容</p></div>'; return; }
    if (index === 0) {
      container.innerHTML = `
        <div class="card"><h3>🎬 情景引入</h3>
          <div class="dialogue-box">${escapeHtml(content.scenario || content.dialogue || '')}</div>
        </div>`;
    } else if (index === 1) {
      container.innerHTML = `
        <div class="card"><h3>📝 核心词汇</h3>
          <div class="vocab-grid">${(content.vocabulary || []).map(v => `
            <div class="vocab-item"><div class="vocab-jyutping">${escapeHtml(v.jyutping||'')}</div><div class="vocab-word">${escapeHtml(v.word)}</div><div class="vocab-meaning">${escapeHtml(v.meaning)}</div></div>
          `).join('')}</div></div>`;
    } else if (index === 2) {
      container.innerHTML = (content.grammar || []).map(g => `
        <div class="card mb-16"><h3>📖 语法/表达</h3>
          <div class="grammar-item"><div class="grammar-pattern">${escapeHtml(g.pattern)}</div><div>${escapeHtml(g.explanation)}</div><div class="grammar-example">💬 ${escapeHtml(g.example)}</div></div>
        </div>`).join('');
    } else if (index === 3) {
      container.innerHTML = content.culture ? `
        <div class="card"><h3>💡 文化小知识</h3><div class="culture-box">${escapeHtml(content.culture)}</div></div>` : '';
    }
  },

  // ========== Module Renderers ==========

  _renderDialogueModule(container, module) {
    const scenes = module.scenes || [];
    let html = `<div class="dialogue-scenario-card card mb-16">
      <p class="dialogue-scenario-text">📍 ${escapeHtml(module.scenario || '')}</p>
    </div>`;

    scenes.forEach((scene, si) => {
      html += `
        <div class="dialogue-scene mb-16">
          <div class="dialogue-scene-header">
            <span class="dialogue-scene-name">${escapeHtml(scene.name)}</span>
            <span class="dialogue-scene-location">${escapeHtml(scene.location || '')}</span>
            <button class="dialogue-play-all btn btn-sm btn-outline" onclick="App.playSceneAudio(${si})">🔊 全部播放</button>
          </div>`;

      (scene.lines || []).forEach((line, li) => {
        const isUser = line.speaker === '你';
        const lineVoice = this._getVoiceForSpeaker(line.speaker);
        html += `
          <div class="dialogue-bubble-wrapper ${isUser ? 'user' : 'other'}">
            ${!isUser ? `<div class="dialogue-avatar">${escapeHtml(line.speaker.slice(0, 1))}</div>` : ''}
            <div class="dialogue-bubble ${isUser ? 'user' : 'other'}">
              <div class="dialogue-speaker">${escapeHtml(line.speaker)} ${lineVoice === 'Kiki' ? '👩' : '👨'}</div>
              <div class="dialogue-text">${escapeHtml(line.text)}</div>
              <div class="dialogue-actions">
                <button class="dialogue-play-btn" onclick="App.speakText('${escapeHtml(line.text).replace(/'/g, "\\'")}', '${lineVoice}')" title="播放 (${lineVoice === 'Kiki' ? '女声' : '男声'})">🔊</button>
                <button class="dialogue-expand-btn" onclick="this.closest('.dialogue-bubble-wrapper').querySelector('.dialogue-detail').classList.toggle('show')" title="展开详情">▼</button>
              </div>
              <div class="dialogue-detail">
                <div class="dialogue-jyutping">🔤 ${escapeHtml(line.jyutping || '')}</div>
                <div class="dialogue-mandarin">🇨🇳 ${escapeHtml(line.mandarin || '')}</div>
              </div>
            </div>
            ${isUser ? `<div class="dialogue-avatar">🦁</div>` : ''}
          </div>`;
      });

      html += `</div>`;
    });

    // Add scenario challenge button
    html += `
      <div class="text-center mt-16 mb-16">
        <button class="btn-scenario-challenge" onclick="App._startScenarioChallenge(${this._courseId})">
          🎭 用这段对话发起情景对战
        </button>
      </div>`;

    container.innerHTML = html;
  },

  _renderVocabModule(container, module) {
    const words = module.words || [];
    let html = '<div class="vocab-flip-grid">';

    words.forEach((w, i) => {
      html += `
        <div class="vocab-flip-card" onclick="this.classList.toggle('flipped')">
          <div class="vocab-flip-inner">
            <div class="vocab-flip-front">
              <div class="vocab-flip-word">${escapeHtml(w.word)}</div>
              <div class="vocab-flip-jyutping">${escapeHtml(w.jyutping)}</div>
              <button class="dialogue-play-btn" onclick="event.stopPropagation(); App.speakText('${escapeHtml(w.word).replace(/'/g, "\\'")}', 'vocab')" title="播放发音">🔊</button>
              ${w.enteringTone ? '<span class="vocab-entering-badge">入</span>' : ''}
            </div>
            <div class="vocab-flip-back">
              <div class="vocab-flip-meaning">${escapeHtml(w.mandarin)}</div>
              <div class="vocab-flip-mnemonic">💡 谐音：${escapeHtml(w.mnemonic)}</div>
              <div class="vocab-flip-scene">📌 ${escapeHtml(w.scene)}</div>
              ${w.enteringTone ? '<div class="vocab-flip-tone">⚠️ 入声字：发音短促有力，勿拖长尾音</div>' : ''}
            </div>
          </div>
        </div>`;
    });

    html += '</div>';

    // Number reference table (for 数字与日期 course)
    if (module.numberTable && this._courseData && this._courseData.number_reference) {
      const numRef = this._courseData.number_reference;
      html += `
        <div class="card mt-16" style="border:2px solid #e8a838;">
          <div class="number-ref-header" onclick="this.closest('.card').classList.toggle('expanded');" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="margin:0;font-size:15px;">📖 粤语数字速查表</h3>
            <span class="culture-expand-arrow">▼</span>
          </div>
          <div class="number-ref-body" style="display:none;">
            <div class="number-ref-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:12px;">
              ${(numRef.digits || []).map(d => `
                <div class="number-ref-cell" style="background:#FFF8EE;border-radius:8px;padding:8px 4px;text-align:center;font-size:12px;">
                  <div style="font-size:20px;font-weight:700;color:#e8a838;">${d.num}</div>
                  <div style="font-weight:600;color:#2d6a4f;">${escapeHtml(d.canto)}</div>
                  <div style="color:var(--text-muted);font-size:11px;">${escapeHtml(d.jyutping)}</div>
                  <button class="dialogue-play-btn" onclick="App.speakText('${escapeHtml(d.canto).replace(/'/g, "\\'")}', 'vocab')" style="font-size:10px;padding:2px 6px;" title="播放发音">🔊</button>
                </div>
              `).join('')}
            </div>
            <div class="number-ref-special" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #eee;">
              ${(numRef.special || []).map(s => `
                <div class="number-ref-cell" style="background:#FFF0E6;border-radius:8px;padding:6px 10px;text-align:center;font-size:12px;">
                  <div style="font-size:14px;font-weight:700;color:#e8a838;">${s.num}</div>
                  <div style="font-weight:600;color:#2d6a4f;">${escapeHtml(s.canto)}</div>
                  <div style="color:var(--text-muted);font-size:11px;">${escapeHtml(s.jyutping)}${s.note ? ' (' + escapeHtml(s.note) + ')' : ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <script>
          // Initialize number ref table toggle
          (function() {
            const header = document.querySelector('.number-ref-header');
            const body = document.querySelector('.number-ref-body');
            if (header && body) {
              header.addEventListener('click', function() {
                const card = this.closest('.card');
                if (card.classList.contains('expanded')) {
                  card.classList.remove('expanded');
                  body.style.display = 'none';
                  this.querySelector('.culture-expand-arrow').textContent = '▼';
                } else {
                  card.classList.add('expanded');
                  body.style.display = 'block';
                  this.querySelector('.culture-expand-arrow').textContent = '▲';
                }
              });
            }
          })();
        </script>`;
    }

    // Department & Position reference tables (for 公司组织架构 course)
    if (module.showDeptRef && this._courseData && this._courseData.departments) {
      const depts = this._courseData.departments;
      html += `
        <div class="card mt-16" style="border:2px solid #4a90d9;">
          <div class="ref-header ref-header-dept" onclick="var c=this.closest('.card');var b=c.querySelector('.ref-body-dept');var a=this.querySelector('.culture-expand-arrow');if(c.classList.contains('expanded')){c.classList.remove('expanded');b.style.display='none';a.textContent='▼'}else{c.classList.add('expanded');b.style.display='block';a.textContent='▲'}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="margin:0;font-size:15px;">🏢 常见部门粤语名称一览</h3>
            <span class="culture-expand-arrow">▼</span>
          </div>
          <div class="ref-body-dept" style="display:none;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px;">
              ${depts.map(d => `
                <div class="ref-cell" style="background:#F0F6FF;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="font-weight:600;color:#2d6a4f;">${escapeHtml(d.name)}</span>
                  <span style="color:var(--text-muted);font-size:12px;">${escapeHtml(d.jyutping)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`;
    }

    if (module.showPositionRef && this._courseData && this._courseData.positions) {
      const pos = this._courseData.positions;
      html += `
        <div class="card mt-16" style="border:2px solid #e8a838;">
          <div class="ref-header ref-header-pos" onclick="var c=this.closest('.card');var b=c.querySelector('.ref-body-pos');var a=this.querySelector('.culture-expand-arrow');if(c.classList.contains('expanded')){c.classList.remove('expanded');b.style.display='none';a.textContent='▼'}else{c.classList.add('expanded');b.style.display='block';a.textContent='▲'}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="margin:0;font-size:15px;">💼 常见职位粤语名称一览</h3>
            <span class="culture-expand-arrow">▼</span>
          </div>
          <div class="ref-body-pos" style="display:none;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px;">
              ${pos.map(p => `
                <div class="ref-cell" style="background:#FFF8EE;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="font-weight:600;color:#2d6a4f;">${escapeHtml(p.title)}</span>
                  <span style="color:var(--text-muted);font-size:12px;">${escapeHtml(p.jyutping)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`;
    }

    // Email terms reference table (for 电邮基本用语 course)
    if (module.showEmailTerms && this._courseData && this._courseData.email_terms) {
      const terms = this._courseData.email_terms;
      html += `
        <div class="card mt-16" style="border:2px solid #2d6a4f;">
          <div class="ref-header ref-header-email" onclick="var c=this.closest('.card');var b=c.querySelector('.ref-body-email');var a=this.querySelector('.culture-expand-arrow');if(c.classList.contains('expanded')){c.classList.remove('expanded');b.style.display='none';a.textContent='▼'}else{c.classList.add('expanded');b.style.display='block';a.textContent='▲'}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="margin:0;font-size:15px;">📧 电邮常用动作中英对照表</h3>
            <span class="culture-expand-arrow">▼</span>
          </div>
          <div class="ref-body-email" style="display:none;">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:12px;">
              <div style="font-weight:700;font-size:12px;color:var(--text-muted);padding:6px 4px;text-align:center;background:#E8F5E9;border-radius:4px;">动作</div>
              <div style="font-weight:700;font-size:12px;color:var(--text-muted);padding:6px 4px;text-align:center;background:#E8F5E9;border-radius:4px;">粤语/英文</div>
              <div style="font-weight:700;font-size:12px;color:var(--text-muted);padding:6px 4px;text-align:center;background:#E8F5E9;border-radius:4px;">普通话</div>
              <div style="font-weight:700;font-size:12px;color:var(--text-muted);padding:6px 4px;text-align:center;background:#E8F5E9;border-radius:4px;">发音</div>
              ${terms.map(t => `
                <div style="padding:6px 4px;text-align:center;font-size:12px;font-weight:600;border-bottom:1px solid #eee;">${escapeHtml(t.action)}</div>
                <div style="padding:6px 4px;text-align:center;font-size:12px;color:#2d6a4f;border-bottom:1px solid #eee;">${escapeHtml(t.canto)}</div>
                <div style="padding:6px 4px;text-align:center;font-size:12px;border-bottom:1px solid #eee;">${escapeHtml(t.mandarin)}</div>
                <div style="padding:6px 4px;text-align:center;font-size:12px;border-bottom:1px solid #eee;">
                  <button class="dialogue-play-btn" onclick="App.speakText('${escapeHtml(t.canto).replace(/'/g, "\\'")}', 'vocab')" style="font-size:10px;padding:2px 6px;" title="播放">🔊</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`;
    }

    container.innerHTML = html;
  },

  _renderGrammarModule(container, module) {
    const patterns = module.patterns || [];
    let html = '';

    patterns.forEach((p, pi) => {
      html += `
        <div class="grammar-card card mb-16">
          <h3 class="grammar-title">📖 ${escapeHtml(p.name)}</h3>
          <div class="grammar-usage">${escapeHtml(p.usage)}</div>
          <div class="grammar-examples">
            ${(p.examples || []).map((ex, ei) => {
              const exId = `grammar-ex-${pi}-${ei}`;
              return `
              <div class="grammar-example-item" id="${exId}">
                <div class="grammar-example-main">
                  <div class="grammar-example-info">
                    <div class="grammar-example-canto">🗣 ${escapeHtml(ex.canto)}</div>
                    <div class="grammar-example-jp">🔤 ${escapeHtml(ex.jyutping)}</div>
                    <div class="grammar-example-zh">🇨🇳 ${escapeHtml(ex.mandarin)}</div>
                    <div class="grammar-example-actions">
                      <button class="grammar-act-btn grammar-play-btn"
                        onclick="App.speakText('${escapeHtml(ex.canto).replace(/'/g, "\\\\'")}', 'Kiki')"
                        title="标准发音">🔊 听发音</button>
                      <button class="grammar-act-btn grammar-record-btn"
                        id="grammar-rec-${pi}-${ei}"
                        onclick="App.toggleRecord(this, '${escapeHtml(ex.canto).replace(/'/g, "\\\\'")}')"
                        title="录音跟读">🎤 跟读</button>
                    </div>
                  </div>
                  <div class="grammar-score-col">
                    <div class="grammar-score-label">发音得分</div>
                    <div class="grammar-score-value" id="grammar-scorev-${pi}-${ei}">--</div>
                  </div>
                </div>
                <div class="grammar-record-compare" id="grammar-comp-${pi}-${ei}" style="display:none;" data-target-text="${escapeHtml(ex.canto).replace(/"/g, '&quot;')}">
                  <div class="grammar-compare-header">
                    <span class="grammar-compare-label">📝 发音对比</span>
                    <div class="grammar-compare-row">
                      <button class="grammar-compare-play" onclick="event.stopPropagation(); App.speakText('${escapeHtml(ex.canto).replace(/'/g, "\\\\'")}', 'Kiki')">
                        🔊 标准
                      </button>
                      <button class="grammar-compare-play grammar-compare-user"
                        id="grammar-userplay-${pi}-${ei}"
                        onclick="event.stopPropagation(); App.playUserRecording('grammar-comp-${pi}-${ei}')">
                        ▶️ 我的发音
                      </button>
                      <button class="grammar-compare-retry"
                        onclick="event.stopPropagation(); App.retryRecording('grammar-comp-${pi}-${ei}', 'grammar-rec-${pi}-${ei}', '${escapeHtml(ex.canto).replace(/'/g, "\\\\'")}')">
                        🔄 重录
                      </button>
                    </div>
                  </div>
                  <div class="grammar-eval-detail" id="grammar-eval-${pi}-${ei}">
                    <div class="eval-item eval-wait">⏳ 正在分析发音...</div>
                  </div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`;
    });

    container.innerHTML = html;
  },

  _renderCultureModule(container, module) {
    const items = module.items || [];
    let html = '';

    items.forEach(item => {
      html += `
        <div class="culture-card card mb-16">
          <div class="culture-card-header" onclick="this.closest('.culture-card').classList.toggle('expanded')">
            <span class="culture-card-icon">${escapeHtml(item.icon || '💡')}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <span class="culture-expand-arrow">▼</span>
          </div>
          <div class="culture-card-body">
            <p>${escapeHtml(item.content)}</p>
          </div>
        </div>`;
    });

    container.innerHTML = html;
  },

  _renderPracticeModule(container, module) {
    const exercises = module.exercises || [];
    let html = '';

    exercises.forEach((ex, ei) => {
      html += `<div class="practice-section mb-24" id="practice-section-${ei}">`;
      html += `<h3 class="practice-title">📝 ${escapeHtml(ex.title)}</h3>`;
      if (ex.description) html += `<p class="practice-desc">${escapeHtml(ex.description)}</p>`;

      if (ex.type === 'dialogue_simulation') {
        (ex.scenes || []).forEach((scene, si) => {
          html += `<div class="practice-scene-card card mb-12">
            <div class="practice-scene-prompt">${escapeHtml(scene.scene)}</div>
            <div class="option-list practice-options" data-ex="${ei}" data-scene="${si}">
              ${scene.options.map((opt, oi) => `
                <div class="option-item" data-oi="${oi}" data-correct="${opt.correct}">
                  ${escapeHtml(opt.text)}
                </div>
              `).join('')}
            </div>
            <div class="practice-feedback" style="display:none;"></div>
          </div>`;
        });
      } else if (ex.type === 'fill_in') {
        html += `<div class="card mb-12"><div class="fill-practice-list">`;
        (ex.items || []).forEach((item, fi) => {
          html += `
            <div class="fill-practice-item" data-ex="${ei}" data-fi="${fi}">
              <span class="fill-practice-q">${escapeHtml(item.question)}</span>
              <input type="text" class="fill-input fill-practice-input" placeholder="请输入粤语答案">
              <span class="fill-practice-answer" style="display:none;">✅ ${escapeHtml(item.answer)}</span>
              <span class="fill-practice-wrong" style="display:none;">❌ 正确答案：${escapeHtml(item.answer)}</span>
            </div>`;
        });
        html += `</div>
          <button class="btn btn-primary btn-sm mt-8" onclick="App.checkFillPractice(${ei})">提交填空</button>
        </div>`;
      } else if (ex.type === 'listening_matching') {
        html += `<div class="card mb-12"><div class="listening-match-list">`;
        (ex.items || []).forEach((item, mi) => {
          html += `
            <div class="listening-match-item">
              <button class="dialogue-play-btn" onclick="App.speakText('${escapeHtml(item.canto).replace(/'/g, "\\'")}', 'practice')" title="播放">🔊</button>
              <span class="listening-match-canto">${escapeHtml(item.canto)}</span>
              <span class="listening-match-arrow">→</span>
              <span class="listening-match-mandarin" style="display:none;">${escapeHtml(item.mandarin)}</span>
              <button class="btn btn-sm btn-outline listening-reveal-btn" onclick="this.previousElementSibling.style.display='';this.style.display='none';">显示翻译</button>
            </div>`;
        });
        html += `</div></div>`;
      }

      html += `</div>`;
    });

    container.innerHTML = html;

    // Attach handlers for dialogue simulation options
    container.querySelectorAll('.practice-options .option-item').forEach(opt => {
      opt.addEventListener('click', function() {
        const parent = this.closest('.option-list');
        const feedbackEl = parent.parentElement.querySelector('.practice-feedback');
        
        // Prevent re-selection
        if (parent.classList.contains('answered')) return;
        parent.classList.add('answered');
        parent.querySelectorAll('.option-item').forEach(o => o.style.pointerEvents = 'none');

        const isCorrect = this.dataset.correct === 'true';
        this.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Show correct answer if wrong
        if (!isCorrect) {
          parent.querySelectorAll('.option-item').forEach(o => {
            if (o.dataset.correct === 'true') o.classList.add('correct');
          });
        }

        feedbackEl.style.display = 'block';
        feedbackEl.className = `practice-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedbackEl.textContent = isCorrect ? '✅ 答对了！' : '❌ 答错了，看看正确答案吧！';
      });
    });
  },

  checkFillPractice(exIndex) {
    const section = document.getElementById(`practice-section-${exIndex}`);
    if (!section) return;

    section.querySelectorAll('.fill-practice-item').forEach(item => {
      const input = item.querySelector('.fill-practice-input');
      const answer = item.querySelector('.fill-practice-answer');
      const wrong = item.querySelector('.fill-practice-wrong');
      const userAnswer = input.value.trim();

      input.disabled = true;
      if (userAnswer && userAnswer.toLowerCase() === answer.textContent.replace('✅ ', '').trim().toLowerCase()) {
        answer.style.display = '';
        input.style.borderColor = 'var(--success)';
        input.style.background = '#D5F5E3';
      } else {
        wrong.style.display = '';
        input.style.borderColor = 'var(--danger)';
        input.style.background = '#FDEDEC';
      }
    });
  },

  playSceneAudio(sceneIndex) {
    const module = this._courseData?.modules?.find(m => m.type === 'dialogue');
    if (!module || !module.scenes || !module.scenes[sceneIndex]) return;
    
    const scene = module.scenes[sceneIndex];
    if (scene.lines && scene.lines.length > 0) {
      // Speak all lines in sequence with role-appropriate voices
      this._speakSequence(scene.lines);
      showToast('🔊 正在播放场景对话...');
    }
  },

  _getVoiceForSpeaker(speaker) {
    // Female speakers -> Kiki, male speakers -> Rocky
    const femaleNames = ['Amy', 'amy', '阿清', '嘉欣', 'May', 'may', 'Sandy', 'sandy', '阿美', '阿芳', 'Jenny', 'jenny', '阿红', '阿玲', '阿珍', 'Sarah', 'sarah', 'HR', '秘書', '秘书', 'Maggie', 'maggie', '行政', '同事A'];
    const maleNames = ['Ken', 'ken', '阿强', '張經理', '张经理', '張Manager', 'Manager', '阿达', '阿明', 'Michael', 'michael', 'Sam', 'sam', 'David', 'david', '阿杰', '阿伟', 'Peter', 'peter', 'Vendor', 'vendor', 'Wilson', 'wilson', 'Thomas', 'thomas', '阿輝', '阿辉', '阿叔', '侍應', '同事們'];
    
    if (femaleNames.some(n => speaker.includes(n))) return 'Kiki';
    if (maleNames.some(n => speaker.includes(n))) return 'Rocky';
    // Default: user/learner -> Kiki, others -> Rocky
    if (speaker === '你') return 'Kiki';
    return 'Rocky';
  },

  _speakSequence(lines, index = 0) {
    if (index >= lines.length) return;
    const voice = this._getVoiceForSpeaker(lines[index].speaker);
    this.speakText(lines[index].text, voice, () => {
      setTimeout(() => this._speakSequence(lines, index + 1), 600);
    });
  },

  speakText(text, voiceOrCallback = null, onEnd = null) {
    // Signature: speakText(text, voice?, onEnd?)
    // Backward compat: if second arg is not a known voice and not a function, treat as legacy (no voice)
    const KNOWN_VOICES = ['Kiki', 'Rocky'];
    let voice = null;
    let callback = onEnd;
    
    if (typeof voiceOrCallback === 'function') {
      callback = voiceOrCallback;
    } else if (KNOWN_VOICES.includes(voiceOrCallback)) {
      voice = voiceOrCallback;
    }
    // else: legacy contentType like 'vocab'/'practice'/'dialogue' → no voice, let server use default

    const body = { text };
    if (voice) body.voice = voice;

    // Try backend TTS API first
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => {
      if (res.ok) return res.blob();
      throw new Error('TTS API failed');
    })
    .then(blob => {
      const audio = new Audio(URL.createObjectURL(blob));
      if (callback) audio.onended = callback;
      audio.play().catch(() => {
        this._browserSpeak(text, callback);
      });
    })
    .catch(() => {
      this._browserSpeak(text, callback);
    });
  },

  _browserSpeak(text, onEnd = null) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = 0.85;
      if (onEnd) utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('浏览器不支持语音播放', 'error');
    }
  },

  // ===================== Recording =====================
  async toggleRecord(btn, text) {
    // If already recording, stop
    if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
      this._stopRecording();
      return;
    }

    // Start new recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this._mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      this._recordedChunks = [];
      this._recordingTarget = btn.id;
      this._recognitionResult = '';

      // ====== Start Speech Recognition simultaneously ======
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this._speechRecognition = new SpeechRecognition();
        this._speechRecognition.lang = 'zh-HK'; // Cantonese
        this._speechRecognition.interimResults = true;
        this._speechRecognition.continuous = true;
        this._speechRecognition.maxAlternatives = 1;

        this._speechRecognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          this._recognitionResult = transcript;
          // Show live recognition feedback on button
          if (transcript) {
            btn.textContent = '⏹ 识别中...';
          }
        };

        this._speechRecognition.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
        };

        this._speechRecognition.start();
      }

      this._mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this._recordedChunks.push(e.data);
      };

      this._mediaRecorder.onstop = () => {
        // Stop all tracks
        stream.getTracks().forEach(t => t.stop());

        // Stop recognition
        if (this._speechRecognition) {
          try { this._speechRecognition.stop(); } catch(e) {}
        }

        // Save recording
        const blob = new Blob(this._recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        // Find the compare area & evaluate
        const compId = this._recordingTarget.replace('grammar-rec-', 'grammar-comp-');
        const compDiv = document.getElementById(compId);
        if (compDiv) {
          compDiv.style.display = 'block';
          compDiv.dataset.audioUrl = url;

          // Evaluate pronunciation and update UI
          const targetText = compDiv.dataset.targetText || '';
          this._evaluatePronunciation(compId, targetText);
        }

        // Reset button
        btn.classList.remove('recording');
        btn.textContent = '🎤 跟读';
        this._mediaRecorder = null;
        this._speechRecognition = null;
      };

      this._mediaRecorder.start();
      btn.classList.add('recording');
      btn.textContent = '⏹ 停止';

      // Auto-stop after 8 seconds
      setTimeout(() => {
        if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
          this._stopRecording();
        }
      }, 8000);

    } catch (err) {
      showToast('无法访问麦克风，请检查浏览器权限', 'error');
      console.error('Mic access error:', err);
    }
  },

  _stopRecording() {
    if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
      this._mediaRecorder.stop();
    }
  },

  /**
   * Evaluate pronunciation by comparing recognition result with target text.
   * Produces a multi-dimensional score and comprehensive feedback.
   */
  _evaluatePronunciation(compId, targetText) {
    const compDiv = document.getElementById(compId);
    if (!compDiv) return;

    const recognized = (this._recognitionResult || '').trim();
    const target = targetText.trim();

    // Score element is outside the compare div, find by ID pattern
    const scoreId = compId.replace('grammar-comp-', 'grammar-scorev-');
    const scoreEl = document.getElementById(scoreId);
    const detailEl = compDiv.querySelector('.grammar-eval-detail');
    const evalId = compId.replace('grammar-comp-', 'grammar-eval-');
    const detailEl2 = document.getElementById(evalId) || detailEl;

    if (!recognized || !target) {
      // Recognition failed or empty
      if (scoreEl) {
        scoreEl.textContent = '--';
        scoreEl.className = 'grammar-score-value score-unknown';
      }
      if (detailEl2) {
        detailEl2.innerHTML = `
          <div class="eval-item eval-warn">⚠️ 未能识别到语音，请检查麦克风权限或重试</div>
          <div class="eval-item eval-tip">💡 提示：请使用 Chrome 浏览器，并在安静环境下跟读</div>`;
      }
      return;
    }

    // ====== Scoring Algorithm ======
    const result = this._calcPronunciationScore(target, recognized);

    // Update score circle
    if (scoreEl) {
      scoreEl.textContent = result.overall;
      scoreEl.className = 'grammar-score-value ' + (
        result.overall >= 80 ? 'score-high' :
        result.overall >= 60 ? 'score-mid' : 'score-low'
      );
    }

    // Update detailed evaluation
    if (detailEl2) {
      const stars = result.overall >= 90 ? '⭐⭐⭐⭐⭐' :
                    result.overall >= 75 ? '⭐⭐⭐⭐' :
                    result.overall >= 55 ? '⭐⭐⭐' :
                    result.overall >= 35 ? '⭐⭐' : '⭐';

      const dimLabels = {
        accuracy: { icon: '🎯', name: '发音准确度' },
        completeness: { icon: '📝', name: '内容完整度' },
        fluency: { icon: '🌊', name: '流畅度' }
      };

      const dimsHtml = ['accuracy', 'completeness', 'fluency'].map(k => {
        const d = result.dimensions[k];
        const barColor = d.score >= 80 ? '#27AE60' : d.score >= 50 ? '#F39C12' : '#E74C3C';
        return `
          <div class="eval-dim-item">
            <span class="eval-dim-label">${dimLabels[k].icon} ${dimLabels[k].name}</span>
            <div class="eval-dim-bar-wrap">
              <div class="eval-dim-bar" style="width:${d.score}%;background:${barColor};"></div>
            </div>
            <span class="eval-dim-pct">${d.score}分</span>
          </div>`;
      }).join('');

      detailEl2.innerHTML = `
        <div class="eval-overall-row">
          <div class="eval-stars">${stars}</div>
          <div class="eval-summary">${result.summary}</div>
        </div>
        <div class="eval-dims">${dimsHtml}</div>
        <div class="eval-compare-row">
          <div class="eval-compare-col">
            <div class="eval-compare-label">📢 你说的是：</div>
            <div class="eval-compare-text eval-user-text">${escapeHtml(recognized)}</div>
          </div>
          <div class="eval-compare-col">
            <div class="eval-compare-label">🎯 标准发音：</div>
            <div class="eval-compare-text eval-target-text">${escapeHtml(target)}</div>
          </div>
        </div>
        <div class="eval-suggestions">
          <div class="eval-suggest-title">💡 改进建议</div>
          ${result.suggestions.map(s => `<div class="eval-suggest-item">${s}</div>`).join('')}
        </div>`;
    }
  },

  /**
   * Calculate pronunciation score by comparing recognized text with target.
   */
  _calcPronunciationScore(target, recognized) {
    // 1. Accuracy: character-level matching
    const targetChars = target.replace(/\s+/g, '').split('');
    const recChars = recognized.replace(/\s+/g, '').split('');

    let matchCount = 0;
    const maxLen = Math.max(targetChars.length, recChars.length);
    const minLen = Math.min(targetChars.length, recChars.length);

    // Simple edit-distance-based accuracy
    for (let i = 0; i < minLen; i++) {
      if (targetChars[i] === recChars[i]) matchCount++;
    }
    // Penalty for extra/missing chars
    const lengthPenalty = Math.abs(targetChars.length - recChars.length) * 0.5;
    const accuracyScore = maxLen > 0
      ? Math.max(0, Math.round((matchCount / maxLen) * 100) - lengthPenalty)
      : 0;

    // 2. Completeness: how much of the target was covered
    const targetSet = new Set(targetChars);
    let coveredCount = 0;
    targetSet.forEach(ch => {
      if (recChars.includes(ch)) coveredCount++;
    });
    const completenessScore = targetSet.size > 0
      ? Math.round((coveredCount / targetSet.size) * 100)
      : 0;

    // 3. Fluency: rough estimate based on recognized text structure
    // More recognized chars with reasonable ratio = better fluency
    let fluencyScore = 50; // Base
    if (recChars.length >= targetChars.length * 0.5) fluencyScore += 20;
    if (recChars.length <= targetChars.length * 1.5) fluencyScore += 15;
    if (matchCount >= minLen * 0.5) fluencyScore += 15;
    fluencyScore = Math.min(100, fluencyScore);

    // Overall weighted score
    const overall = Math.round(accuracyScore * 0.5 + completenessScore * 0.3 + fluencyScore * 0.2);

    // Summary text
    let summary, suggestions = [];
    if (overall >= 85) {
      summary = '非常优秀！发音地道，几乎与标准一致。';
      suggestions = ['继续保持，可以尝试更快的语速'];
    } else if (overall >= 70) {
      summary = '表现不错！大部分发音正确，还有提升空间。';
      suggestions = [
        '部分声母/韵母可更精准，建议多听标准发音对比',
        '注意粤语的入声字要短促有力'
      ];
    } else if (overall >= 50) {
      summary = '基本能辨认，但发音偏差较明显，需要多加练习。';
      suggestions = [
        '建议逐字跟读，先确保每个字的声调准确',
        '注意粤语六声九调的区别，多用拼音辅助',
        '可放慢语速，先求准再求快'
      ];
    } else if (overall >= 25) {
      summary = '发音差异较大，建议重新跟读并仔细听标准发音。';
      suggestions = [
        '先从单个词语开始练习，建立正确的发音习惯',
        '注意粤语与普通话发音部位的差异',
        '建议反复听标准发音，逐音节模仿'
      ];
    } else {
      summary = '识别结果与目标差异很大，别灰心，继续努力！';
      suggestions = [
        '确保用粤语（广州话）发音，不是普通话',
        '可以先听几遍标准发音再尝试跟读',
        '建议开启慢速模式，逐字学习'
      ];
    }

    // Add targeted suggestions based on dimensions
    if (accuracyScore < 50) {
      suggestions.push('🔊 点击"标准"按钮反复听，重点对比自己不准确的音');
    }
    if (completenessScore < 50) {
      suggestions.push('📝 跟读时尽量说完完整句子，不要漏字');
    }

    return {
      overall,
      dimensions: {
        accuracy: { score: accuracyScore },
        completeness: { score: completenessScore },
        fluency: { score: fluencyScore }
      },
      summary,
      suggestions: [...new Set(suggestions)].slice(0, 4)
    };
  },

  playUserRecording(compId) {
    const compDiv = document.getElementById(compId);
    if (!compDiv || !compDiv.dataset.audioUrl) {
      showToast('请先录音', 'error');
      return;
    }
    const audio = new Audio(compDiv.dataset.audioUrl);
    audio.play().catch(() => showToast('播放失败', 'error'));
  },

  retryRecording(compId, recBtnId, text) {
    // Hide compare area
    const compDiv = document.getElementById(compId);
    if (compDiv) {
      compDiv.style.display = 'none';
      if (compDiv.dataset.audioUrl) {
        URL.revokeObjectURL(compDiv.dataset.audioUrl);
        delete compDiv.dataset.audioUrl;
      }
    }
    // Reset score
    const scoreId = compId.replace('grammar-comp-', 'grammar-scorev-');
    const scoreEl = document.getElementById(scoreId);
    if (scoreEl) {
      scoreEl.textContent = '--';
      scoreEl.className = 'grammar-score-value';
    }
    // Re-trigger recording
    const btn = document.getElementById(recBtnId);
    if (btn) this.toggleRecord(btn, text);
  },

  async startCourse(courseId) {
    try {
      await API.startCourse(courseId);
      showToast('开始学习！');
      showAda(AdaMessages.welcome.replace('%@nickname%', App.currentUser.nickname));
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async createChallengeFromCourse(courseId) {
    try {
      const result = await API.createChallenge(courseId);
      const main = document.getElementById('main-content');
      
      // Show challenge code modal
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal">
          <h3>⚔️ 发起对战</h3>
          <p style="margin-bottom:16px;">复制以下对战码，发送给你的搭子</p>
          <div class="challenge-code">
            <div class="code">${result.challengeCode}</div>
          </div>
          <p style="font-size:13px;color:var(--text-light);">对战ID: ${result.challengeId}</p>
          <div class="modal-actions">
            <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">关闭</button>
            <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${result.challengeCode}');showToast('已复制对战码！');">📋 复制</button>
            <button class="btn btn-success" onclick="location.hash='#/challenge/${result.challengeId}';this.closest('.modal-overlay').remove()">进入对战</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== PRACTICE =====================
  async renderPractice(courseId) {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const questions = await API.getPracticeQuestions(courseId);

      main.innerHTML = `
        <div style="margin-bottom:16px;">
          <a href="#/course/${courseId}" style="font-size:14px;">← 返回课程</a>
        </div>
        <div class="page-title">✏️ 课后练习</div>
        <div class="page-subtitle">共 ${questions.length} 题，认真作答哦！</div>
        <div id="practice-questions"></div>
        <div id="practice-result" style="display:none;"></div>
        <div class="text-center mt-24 mb-24">
          <button class="btn btn-primary btn-lg" id="submit-practice" onclick="App.submitPractice(${courseId})">📝 提交答案</button>
        </div>
      `;

      const container = document.getElementById('practice-questions');
      questions.forEach((q, i) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
          <div class="question-number">第 ${i + 1} 题 · ${q.type === 'fill' ? '填空' : '选择'}</div>
          <div class="question-text">${escapeHtml(q.question)}</div>
          ${q.type === 'fill' 
            ? `<input type="text" class="fill-input" data-qid="${q.id}" placeholder="请输入答案...">
               ${q.hint ? `<p style="font-size:12px;color:var(--text-muted);margin-top:4px;">提示：${escapeHtml(q.hint)}</p>` : ''}`
            : `<div class="option-list">
                ${q.options.map((opt, oi) => `
                  <div class="option-item" data-qid="${q.id}" data-oi="${oi}">
                    ${String.fromCharCode(65 + oi)}. ${escapeHtml(opt)}
                  </div>
                `).join('')}
               </div>`
          }
          <div class="feedback-box" style="display:none;"></div>
        `;

        // Add click handlers for options
        card.querySelectorAll('.option-item').forEach(opt => {
          opt.addEventListener('click', () => {
            const qid = opt.dataset.qid;
            card.querySelectorAll('.option-item').forEach(o => {
              if (o.dataset.qid === qid) o.classList.remove('selected');
            });
            opt.classList.add('selected');
          });
        });

        container.appendChild(card);
      });
    } catch (e) {
      showError(main, e.message);
    }
  },

  async submitPractice(courseId) {
    const answers = [];
    const questionCards = document.querySelectorAll('.question-card');

    questionCards.forEach((card, i) => {
      const selected = card.querySelector('.option-item.selected');
      const fillInput = card.querySelector('.fill-input');

      if (fillInput) {
        answers.push({
          questionId: parseInt(fillInput.dataset.qid),
          answer: fillInput.value.trim()
        });
      } else if (selected) {
        answers.push({
          questionId: parseInt(selected.dataset.qid),
          selectedIndex: parseInt(selected.dataset.oi)
        });
      }
    });

    if (answers.length < questionCards.length) {
      showToast('请完成所有题目', 'error');
      return;
    }

    try {
      const result = await API.submitPractice(courseId, answers);
      
      // Show feedback for each question
      result.results.forEach((r, i) => {
        const card = questionCards[i];
        const feedback = card.querySelector('.feedback-box');
        const allOptions = card.querySelectorAll('.option-item');
        const fillInput = card.querySelector('.fill-input');

        if (fillInput) {
          fillInput.disabled = true;
          if (r.isCorrect) {
            fillInput.style.borderColor = 'var(--success)';
            fillInput.style.background = '#D5F5E3';
          } else {
            fillInput.style.borderColor = 'var(--danger)';
            fillInput.style.background = '#FDEDEC';
          }
        }

        allOptions.forEach(opt => {
          opt.style.pointerEvents = 'none';
          const oi = parseInt(opt.dataset.oi);
          if (r.isCorrect && opt.classList.contains('selected')) {
            opt.classList.add('correct');
          } else if (!r.isCorrect && opt.classList.contains('selected')) {
            opt.classList.add('incorrect');
          }
        });

        feedback.style.display = 'block';
        feedback.className = `feedback-box ${r.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.innerHTML = r.isCorrect 
          ? '✅ 正确！' + (r.explanation ? ` — ${escapeHtml(r.explanation)}` : '')
          : `❌ 不正确。正确答案：${escapeHtml(r.correctAnswer || '')}${r.explanation ? ` — ${escapeHtml(r.explanation)}` : ''}`;
      });

      // Show result
      const resultDiv = document.getElementById('result-display') || document.createElement('div');
      resultDiv.id = 'result-display';
      const scoreClass = result.score >= 80 ? 'score-high' : result.score >= 60 ? 'score-mid' : 'score-low';
      
      const existingResult = document.getElementById('practice-result');
      existingResult.style.display = 'block';
      existingResult.innerHTML = `
        <div class="card">
          <div class="score-display">
            <div class="score-circle ${scoreClass}">${result.score}%</div>
            <h3>${result.correctCount}/${result.totalQuestions} 正确</h3>
            <p style="color:var(--text-light);">
              ${result.score >= 80 ? '🎉 太棒了！你已经掌握了这课内容！' : 
                result.score >= 60 ? '💪 不错！再复习一下会更好！' : 
                '📚 继续加油！建议重新学习课程内容。'}
            </p>
            <div class="flex-center gap-16 mt-16">
              <button class="btn btn-outline" onclick="location.hash='#/course/${courseId}'">返回课程</button>
              <button class="btn btn-primary" onclick="location.hash='#/course/${courseId}/practice'">重新练习</button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('submit-practice').style.display = 'none';

      // Complete course and show Ada
      await API.completeCourse(courseId, result.score);
      
      if (result.score >= 80) {
        showAda(AdaMessages.practice_perfect);
      } else if (result.score < 50) {
        showAda(AdaMessages.practice_bad);
      } else {
        showAda(AdaMessages.practice_ok);
      }

    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== ASSESSMENT =====================
  async renderAssessment() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const questions = await API.getAssessmentQuestions();

      main.innerHTML = `
        <div class="page-title">📊 能力评估</div>
        <div class="page-subtitle">10道职场粤语测试题，看看你的水平在哪？</div>
        <div id="assessment-questions"></div>
        <div class="text-center mt-24 mb-24">
          <button class="btn btn-primary btn-lg" id="submit-assessment" onclick="App.submitAssessment()">📝 提交评估</button>
        </div>
      `;

      const container = document.getElementById('assessment-questions');
      questions.forEach((q, i) => {
        const dimLabels = { listening: '👂 听力', speaking: '🗣️ 情景', reading: '📖 阅读', vocabulary: '✍️ 词汇' };
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
          <div class="question-number">第 ${i + 1} 题 · ${dimLabels[q.dimension] || q.dimension}</div>
          <div class="question-text">${escapeHtml(q.question)}</div>
          <div class="option-list">
            ${q.options.map((opt, oi) => `
              <div class="option-item" data-qid="${q.id}" data-oi="${oi}">
                ${String.fromCharCode(65 + oi)}. ${escapeHtml(opt)}
              </div>
            `).join('')}
          </div>
        `;

        card.querySelectorAll('.option-item').forEach(opt => {
          opt.addEventListener('click', () => {
            card.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
          });
        });

        container.appendChild(card);
      });
    } catch (e) {
      showError(main, e.message);
    }
  },

  async submitAssessment() {
    const answers = [];
    const questionCards = document.querySelectorAll('#assessment-questions .question-card');

    questionCards.forEach(card => {
      const selected = card.querySelector('.option-item.selected');
      if (selected) {
        answers.push({
          questionId: parseInt(selected.dataset.qid),
          selectedIndex: parseInt(selected.dataset.oi)
        });
      }
    });

    if (answers.length < questionCards.length) {
      showToast('请完成所有题目', 'error');
      return;
    }

    try {
      const result = await API.submitAssessment(answers);
      const main = document.getElementById('main-content');

      const scoreClass = result.score >= 80 ? 'score-high' : result.score >= 50 ? 'score-mid' : 'score-low';

      main.innerHTML = `
        <div class="page-title">📊 评估结果</div>
        
        <div class="card mb-16">
          <div class="score-display">
            <div class="score-circle ${scoreClass}">${result.score}</div>
            <h2>${getLevelIcon(result.level)} ${result.levelLabel} — L${result.level}</h2>
            <p style="color:var(--text-light);margin-bottom:16px;">${result.levelState}</p>
            <p style="font-size:14px;">答对 ${result.correctCount}/${result.totalQuestions} 题</p>
          </div>
        </div>

        <div class="card mb-16">
          <h3 style="margin-bottom:16px;">📊 各维度分析</h3>
          ${renderDimensionScores(result.details)}
        </div>

        <div class="text-center mb-24">
          <button class="btn btn-primary btn-lg" onclick="location.hash='#/courses'">📚 查看推荐课程</button>
          <button class="btn btn-outline btn-lg mt-8" onclick="location.hash='#/assess'" style="margin-left:8px;">🔄 重新评估</button>
        </div>
      `;

      if (result.score >= 80) {
        showAda(AdaMessages.assess_good);
      } else if (result.score >= 40) {
        showAda(AdaMessages.assess_ok);
      } else {
        showAda(AdaMessages.assess_beginner);
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== PARTNERS =====================
  async renderPartners() {
    const main = document.getElementById('main-content');
    showLoading(main);

    // Check if joining via invite code
    const urlParams = new URLSearchParams(location.hash.includes('?') ? location.hash.split('?')[1] : '');
    const joinCode = urlParams.get('join');

    try {
      const [partners, recommended] = await Promise.all([
        API.getPartners(),
        API.recommendPartners()
      ]);

      let html = `
        <div class="page-title">🤝 学习搭子</div>
        
        <div class="tabs">
          <button class="tab active" onclick="App.switchPartnerTab('my', this)">我的搭子 (${partners.filter(p => p.status === 'accepted').length})</button>
          <button class="tab" onclick="App.switchPartnerTab('recommend', this)">推荐搭子</button>
          <button class="tab" onclick="App.switchPartnerTab('invite', this)">邀请搭子</button>
          <button class="tab" onclick="App.switchPartnerTab('requests', this)">搭子请求</button>
        </div>

        <div id="partner-tab-my">
          ${partners.filter(p => p.status === 'accepted').length === 0
            ? `<div class="empty-state">
                <div class="empty-icon">🤝</div>
                <h3>还没有学习搭子</h3>
                <p>找一个搭子一起学粤语，进步更快！</p>
               </div>`
            : partners.filter(p => p.status === 'accepted').map(p => partnerCardHtml(p)).join('')
          }
        </div>

        <div id="partner-tab-recommend" style="display:none;">
          ${recommended.length === 0
            ? `<div class="empty-state"><p>暂时没有推荐搭子</p></div>`
            : recommended.map(u => `
              <div class="partner-card">
                ${avatarHtml(u)}
                <div class="partner-info">
                  <h3>${escapeHtml(u.nickname)}</h3>
                  <div class="partner-meta">
                    ${levelBadgeHtml(u.level)}
                    <span style="margin-left:8px;">📚 ${u.courses_completed || 0} 课</span>
                    <span style="margin-left:8px;">⭐ ${u.score} 分</span>
                  </div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">最近活跃: ${timeAgo(u.last_active)}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="App.sendPartnerRequest(${u.id})">交个朋友</button>
              </div>
            `).join('')
          }
        </div>

        <div id="partner-tab-invite" style="display:none;">
          <div class="card">
            <h3 style="margin-bottom:16px;">📨 邀请搭子</h3>
            <p style="color:var(--text-light);margin-bottom:16px;">生成邀请码，发送给你的同事或朋友</p>
            <button class="btn btn-primary" onclick="App.generateInviteCode()">🎫 生成邀请码</button>
            <div id="invite-code-display" style="margin-top:16px;"></div>
            ${joinCode ? `
              <div style="margin-top:16px;padding:12px;background:#FFF0E6;border-radius:10px;">
                <p>检测到邀请码: <strong>${joinCode}</strong></p>
                <button class="btn btn-success btn-sm mt-8" onclick="App.joinViaCode('${joinCode}')">加入</button>
              </div>
            ` : `
              <div class="mt-16">
                <label class="form-label">输入邀请码加入</label>
                <div class="flex gap-8">
                  <input type="text" id="join-code-input" class="form-input" placeholder="输入邀请码" style="flex:1;">
                  <button class="btn btn-success" onclick="App.joinViaCode()">加入</button>
                </div>
              </div>
            `}
          </div>
        </div>

        <div id="partner-tab-requests" style="display:none;">
          ${partners.filter(p => p.status === 'pending').length === 0
            ? `<div class="empty-state"><p>没有待处理的请求</p></div>`
            : partners.filter(p => p.status === 'pending').map(p => `
              <div class="partner-card">
                ${avatarHtml(p)}
                <div class="partner-info">
                  <h3>${escapeHtml(p.nickname)}</h3>
                  <p style="font-size:13px;color:var(--text-light);">
                    ${p.direction === 'received' ? '想和你成为搭子' : '已发送请求'}
                  </p>
                </div>
                ${p.direction === 'received' ? `
                  <div class="flex gap-8">
                    <button class="btn btn-success btn-sm" onclick="App.respondPartner(${p.relation_id}, 'accept')">接受</button>
                    <button class="btn btn-danger btn-sm" onclick="App.respondPartner(${p.relation_id}, 'reject')">拒绝</button>
                  </div>
                ` : `<span style="font-size:12px;color:var(--text-muted);">等待中</span>`}
              </div>
            `).join('')
          }
        </div>
      `;

      main.innerHTML = html;
    } catch (e) {
      showError(main, e.message);
    }
  },

  switchPartnerTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    ['my', 'recommend', 'invite', 'requests'].forEach(t => {
      const div = document.getElementById(`partner-tab-${t}`);
      if (div) div.style.display = t === tab ? 'block' : 'none';
    });
  },

  async sendPartnerRequest(userId) {
    try {
      await API.requestPartner(userId);
      showToast('已发送搭子请求！');
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async respondPartner(relationId, action) {
    try {
      await API.respondPartner(relationId, action);
      showToast(action === 'accept' ? '已成为搭子！' : '已拒绝');
      showAda(AdaMessages.found_partner);
      location.reload();
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async generateInviteCode() {
    try {
      const result = await API.invitePartner();
      const display = document.getElementById('invite-code-display');
      display.innerHTML = `
        <div class="challenge-code">
          <p style="font-size:13px;color:var(--text-light);margin-bottom:8px;">分享此邀请码给你的朋友</p>
          <div class="code">${result.inviteCode}</div>
        </div>
        <button class="btn btn-outline btn-sm mt-8" onclick="navigator.clipboard.writeText('${result.inviteCode}');showToast('已复制！')">📋 复制邀请码</button>
      `;
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async joinViaCode(code) {
    const inputCode = code || document.getElementById('join-code-input')?.value.trim();
    if (!inputCode) {
      showToast('请输入邀请码', 'error');
      return;
    }
    try {
      await API.joinPartner(inputCode);
      showToast('成功加入！你们现在是搭子了！');
      showAda(AdaMessages.found_partner);
      location.reload();
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== PARTNER DETAIL =====================
  async renderPartnerDetail(partnerId) {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const [partners, feed, courses] = await Promise.all([
        API.getPartners(),
        API.getPartnerFeed(partnerId),
        API.getCourses()
      ]);

      const partner = partners.find(p => p.id === parseInt(partnerId));
      if (!partner) {
        showError(main, '搭子不存在');
        return;
      }

      const completedCourses = feed.filter(f => f.action === 'complete_course');

      main.innerHTML = `
        <div style="margin-bottom:16px;">
          <a href="#/partners" style="font-size:14px;">← 返回搭子列表</a>
        </div>

        <div class="card mb-16 text-center">
          ${avatarHtml(partner, 'avatar-lg')}
          <h2 style="margin-top:12px;">${escapeHtml(partner.nickname)}</h2>
          ${levelBadgeHtml(partner.level)}
          <p style="margin-top:8px;color:var(--text-light);">⭐ ${partner.score} 分</p>
        </div>

        <div class="card mb-16">
          <h3 style="margin-bottom:16px;">📡 学习动态</h3>
          ${feed.length === 0
            ? `<div class="empty-state"><p>暂无动态</p></div>`
            : feed.map(f => feedItemHtml(f)).join('')
          }
        </div>

        <div class="card mb-16">
          <h3 style="margin-bottom:16px;">⚔️ 发起对战</h3>
          <p style="color:var(--text-light);margin-bottom:12px;">选一课你们都学过的课程发起对战</p>
          <select id="challenge-course-select" class="form-select mb-8">
            <option value="">选择课程...</option>
            ${courses.map(c => `<option value="${c.id}">L${c.level} - ${escapeHtml(c.title)}</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="App.challengePartner(${partnerId})">发起对战</button>
        </div>

        <button class="btn btn-danger" style="width:100%;" onclick="App.removePartner(${partner.relation_id})">
          解除搭子关系
        </button>
      `;
    } catch (e) {
      showError(main, e.message);
    }
  },

  async challengePartner(partnerId) {
    const courseId = document.getElementById('challenge-course-select')?.value;
    if (!courseId) {
      showToast('请选择课程', 'error');
      return;
    }
    try {
      const result = await API.createChallenge(parseInt(courseId));
      location.hash = `#/challenge/${result.challengeId}`;
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async removePartner(relationId) {
    if (!confirm('确定要解除搭子关系吗？')) return;
    try {
      await API.deletePartner(relationId);
      showToast('已解除搭子关系');
      location.hash = '#/partners';
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== CHALLENGE =====================
  async renderChallenge(challengeId) {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const challenge = await API.getChallenge(challengeId);

      // Redirect scenario challenges to their own renderer
      if (challenge.challenge_mode === 'scenario') {
        location.hash = `#/scenario-challenge/${challengeId}`;
        return;
      }

      const questions = await API.getPracticeQuestions(challenge.course_id);
      const userId = App.currentUser.id;

      const isChallenger = challenge.challenger_id === userId;
      const isOpponent = challenge.opponent_id === userId;
      const isParticipant = isChallenger || isOpponent;

      if (challenge.status === 'pending') {
        main.innerHTML = `
          <div class="page-title">⚔️ 对战</div>
          <div class="card text-center">
            <h3>${escapeHtml(challenge.course_title)}</h3>
            <p style="color:var(--text-light);">L${challenge.course_level}</p>
            
            <div class="vs-display">
              <div class="vs-player">
                ${avatarHtml({ nickname: challenge.challenger_name, avatar_color: challenge.challenger_avatar }, 'avatar-lg')}
                <h3>${escapeHtml(challenge.challenger_name)}</h3>
                <p style="font-size:13px;color:var(--text-muted);">发起人</p>
              </div>
              <div class="vs-vs">VS</div>
              <div class="vs-player">
                <div class="avatar avatar-lg" style="background:var(--text-muted);">?</div>
                <h3>等待加入</h3>
              </div>
            </div>

            <div class="challenge-code">
              <p style="font-size:13px;color:var(--text-light);margin-bottom:8px;">对战码</p>
              <div class="code">${challenge.challenge_code || challengeId}</div>
            </div>

            ${!isChallenger ? `
              <button class="btn btn-primary btn-lg mt-16" onclick="App.joinChallenge(${challengeId})">加入对战</button>
            ` : `
              <p style="color:var(--text-muted);">等待搭子加入...</p>
              <button class="btn btn-outline mt-8" onclick="location.reload()">刷新</button>
            `}
          </div>
        `;
      } else if (challenge.status === 'active' && isParticipant) {
        // Active challenge - render questions
        const hasSubmitted = isChallenger ? challenge.challenger_score > 0 : challenge.opponent_score > 0;

        if (hasSubmitted) {
          main.innerHTML = `
            <div class="page-title">⚔️ 对战进行中</div>
            <div class="card text-center">
              <p style="font-size:18px;margin-bottom:16px;">你已提交答案，等待对方完成...</p>
              <div class="spinner"></div>
              <button class="btn btn-outline mt-16" onclick="location.reload()">刷新状态</button>
            </div>
          `;
        } else {
          main.innerHTML = `
            <div class="page-title">⚔️ 对战答题</div>
            <div class="page-subtitle">${escapeHtml(challenge.course_title)} · 共 ${questions.length} 题</div>
            <div id="challenge-questions"></div>
            <div class="text-center mt-24 mb-24">
              <button class="btn btn-primary btn-lg" onclick="App.submitChallenge(${challengeId})">提交对战</button>
            </div>
          `;

          const container = document.getElementById('challenge-questions');
          questions.forEach((q, i) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.innerHTML = `
              <div class="question-number">第 ${i + 1} 题</div>
              <div class="question-text">${escapeHtml(q.question)}</div>
              ${q.type === 'fill'
                ? `<input type="text" class="fill-input" data-qid="${q.id}" placeholder="请输入答案...">`
                : `<div class="option-list">
                    ${q.options.map((opt, oi) => `
                      <div class="option-item" data-qid="${q.id}" data-oi="${oi}">
                        ${String.fromCharCode(65 + oi)}. ${escapeHtml(opt)}
                      </div>
                    `).join('')}
                   </div>`
              }
            `;

            card.querySelectorAll('.option-item').forEach(opt => {
              opt.addEventListener('click', () => {
                card.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
              });
            });

            container.appendChild(card);
          });
        }
      } else if (challenge.status === 'completed') {
        const isWinner = challenge.winner_id === userId;
        const isDraw = !challenge.winner_id;
        
        main.innerHTML = `
          <div class="page-title">⚔️ 对战结果</div>
          <div class="card">
            <div class="vs-display">
              <div class="vs-player">
                ${avatarHtml({ nickname: challenge.challenger_name, avatar_color: challenge.challenger_avatar }, 'avatar-lg')}
                <h3>${escapeHtml(challenge.challenger_name)}</h3>
                <div class="score">${challenge.challenger_score}%</div>
                <div class="vs-winner ${challenge.winner_id === challenge.challenger_id ? 'win' : 'lose'}">
                  ${challenge.winner_id === challenge.challenger_id ? '🏆 胜利' : challenge.winner_id ? '再接再厉' : '🤝'}
                </div>
              </div>
              <div class="vs-vs">VS</div>
              <div class="vs-player">
                ${avatarHtml({ nickname: challenge.opponent_name || '?', avatar_color: challenge.opponent_avatar || '#BDC3C7' }, 'avatar-lg')}
                <h3>${escapeHtml(challenge.opponent_name || '?')}</h3>
                <div class="score">${challenge.opponent_score}%</div>
                <div class="vs-winner ${challenge.winner_id === challenge.opponent_id ? 'win' : challenge.winner_id ? 'lose' : 'draw'}">
                  ${challenge.winner_id === challenge.opponent_id ? '🏆 胜利' : challenge.winner_id ? '再接再厉' : '🤝 平局'}
                </div>
              </div>
            </div>
            <div class="text-center mt-16">
              ${isWinner ? '<p style="font-size:18px;color:var(--success);font-weight:700;">🎉 恭喜你赢了！</p>' :
                isDraw ? '<p style="font-size:18px;color:var(--secondary);font-weight:700;">🤝 平局！</p>' :
                '<p style="font-size:18px;color:var(--text-light);font-weight:700;">💪 再接再厉！</p>'}
              <button class="btn btn-primary mt-16" onclick="location.hash='#/courses'">继续学习</button>
            </div>
          </div>
        `;

        if (isWinner) showAda(AdaMessages.challenge_win);
        else if (!isDraw) showAda(AdaMessages.challenge_lose);
      } else {
        main.innerHTML = `<div class="empty-state"><p>你不在这个对战中</p></div>`;
      }
    } catch (e) {
      showError(main, e.message);
    }
  },

  async joinChallenge(challengeId) {
    try {
      await API.joinChallenge(challengeId);
      location.reload();
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async submitChallenge(challengeId) {
    const answers = [];
    const questionCards = document.querySelectorAll('#challenge-questions .question-card');

    questionCards.forEach(card => {
      const selected = card.querySelector('.option-item.selected');
      const fillInput = card.querySelector('.fill-input');

      if (fillInput) {
        answers.push({
          questionId: parseInt(fillInput.dataset.qid),
          answer: fillInput.value.trim()
        });
      } else if (selected) {
        answers.push({
          questionId: parseInt(selected.dataset.qid),
          selectedIndex: parseInt(selected.dataset.oi)
        });
      }
    });

    if (answers.length < questionCards.length) {
      showToast('请完成所有题目', 'error');
      return;
    }

    try {
      await API.submitChallenge(challengeId, answers);
      showToast('已提交！');
      location.reload();
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  // ===================== SCENARIO CHALLENGE (Dialogue Battle) =====================
  _scenarioChallenge: null,
  _scenarioTurns: [],
  _scenarioSubmissions: {},
  _scenarioResults: {},
  _scenarioCurrentTurn: 0,
  _scenarioCompleted: false,

  async renderScenarioChallenge(challengeId) {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const challenge = await API.getScenarioChallenge(challengeId);
      this._scenarioChallenge = challenge;
      this._scenarioTurns = challenge.turns || [];
      this._scenarioSubmissions = challenge.submittedTurns || {};
      this._scenarioResults = {};
      this._scenarioCompleted = challenge.status === 'completed';
      this._scenarioCurrentTurn = this._scenarioSubmissions ? Object.keys(this._scenarioSubmissions).length : 0;

      const userId = App.currentUser.id;

      if (!challenge.isParticipant) {
        main.innerHTML = '<div class="empty-state"><p>你不在这个对战中</p></div>';
        return;
      }

      if (challenge.status === 'pending') {
        this._renderScenarioPending(challenge, main);
      } else if (challenge.status === 'active') {
        this._renderScenarioActive(challenge, main);
      } else if (challenge.status === 'completed') {
        this._renderScenarioResult(challenge, main);
      }
    } catch (e) {
      showError(main, e.message);
    }
  },

  _renderScenarioPending(challenge, main) {
    const isChallenger = challenge.isChallenger;
    main.innerHTML = `
      <div class="page-title">🎭 情景对话对战</div>
      <div class="card text-center">
        <h3>${escapeHtml(challenge.course_title)}</h3>
        <p style="color:var(--text-light);">L${challenge.course_level}</p>
        
        <div class="vs-display">
          <div class="vs-player">
            ${avatarHtml({ nickname: challenge.challenger_name, avatar_color: challenge.challenger_avatar }, 'avatar-lg')}
            <h3>${escapeHtml(challenge.challenger_name)}</h3>
            <p style="font-size:13px;color:var(--text-muted);">发起人</p>
          </div>
          <div class="vs-vs">VS</div>
          <div class="vs-player">
            <div class="avatar avatar-lg" style="background:var(--text-muted);">?</div>
            <h3>等待加入</h3>
          </div>
        </div>

        <div class="challenge-code">
          <p style="font-size:13px;color:var(--text-light);margin-bottom:8px;">对战码</p>
          <div class="code">${challenge.challenge_code || challenge.id}</div>
        </div>

        ${!isChallenger ? `
          <button class="btn btn-primary btn-lg mt-16" onclick="App._joinScenarioChallenge(${challenge.id})">加入对话对战</button>
        ` : `
          <p style="color:var(--text-muted);">等待搭子加入...</p>
          <button class="btn btn-outline mt-8" onclick="location.reload()">刷新</button>
        `}
      </div>
    `;
  },

  async _joinScenarioChallenge(challengeId) {
    try {
      await API.joinChallenge(challengeId);
      location.reload();
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async _startScenarioChallenge(courseId) {
    try {
      const result = await API.createScenarioChallenge(courseId);
      showToast(`情景对战已发起！对战码: ${result.challengeCode}`);
      location.hash = `#/scenario-challenge/${result.challengeId}`;
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  _renderScenarioActive(challenge, main) {
    // Determine if current user has submitted all turns
    const submitted = this._scenarioSubmissions;
    const mySubmittedCount = submitted ? Object.keys(submitted).length : 0;
    const totalBTurns = this._scenarioTurns.filter(t => t.role === 'B').length;

    main.innerHTML = `
      <div class="page-title">🎭 情景对话对战</div>
      <div class="scenario-scene-info">
        📍 ${escapeHtml(challenge.course_title)}（L${challenge.course_level}）
      </div>
      <div class="scenario-challenge-header">
        <div class="scenario-vs">
          <span class="vs-player-name">${escapeHtml(challenge.challenger_name)}</span>
          <span class="vs-divider">⚔️</span>
          <span class="vs-player-name">${escapeHtml(challenge.opponent_name || '?')}</span>
        </div>
      </div>
      <div class="scenario-conversation" id="scenario-conversation">
        ${this._renderScenarioConversation()}
      </div>
      <div id="scenario-input-section"></div>
    `;

    // Render input area if user hasn't completed
    this._renderScenarioInputSection(totalBTurns);

    // Scroll to bottom of conversation
    setTimeout(() => {
      const conv = document.getElementById('scenario-conversation');
      if (conv) conv.scrollTop = conv.scrollHeight;
    }, 100);
  },

  _renderScenarioConversation() {
    const allTurns = this._scenarioTurns;
    const submitted = this._scenarioSubmissions || {};
    const results = this._scenarioResults || {};
    let html = '';

    let bIndex = 0;
    for (let i = 0; i < allTurns.length; i++) {
      const turn = allTurns[i];
      if (turn.role === 'A') {
        html += `
          <div class="scenario-msg-wrapper role-A">
            <div class="scenario-msg-speaker">A说：</div>
            <div class="scenario-msg-bubble">${escapeHtml(turn.text)}</div>
          </div>`;
      } else {
        // B turn - show if submitted or if it's the current turn being answered
        if (submitted[bIndex] !== undefined) {
          const userAnswer = submitted[bIndex];
          const result = results[bIndex];
          html += `
            <div class="scenario-msg-wrapper role-B">
              <div class="scenario-msg-speaker">你说：</div>
              <div class="scenario-msg-bubble">${escapeHtml(userAnswer)}</div>
            </div>
            ${result ? `<div class="scenario-turn-feedback ${result.score >= 80 ? 'good' : result.score >= 50 ? 'ok' : 'low'}">
              ${result.score >= 80 ? '✅ 很好！' : result.score >= 50 ? '⚠️ 还可以进步' : '❌ 需要加油'} 原文：${escapeHtml(result.expected)}
            </div>` : ''}`;
        }
        bIndex++;
      }
    }
    return html;
  },

  _renderScenarioInputSection(totalBTurns) {
    const section = document.getElementById('scenario-input-section');
    if (!section) return;

    const submitted = this._scenarioSubmissions || {};
    const mySubmittedCount = Object.keys(submitted).length;

    if (this._scenarioCompleted) {
      section.innerHTML = '';
      return;
    }

    if (mySubmittedCount >= totalBTurns) {
      // User has submitted all, waiting for opponent
      section.innerHTML = `
        <div class="scenario-waiting">
          <div class="spinner"></div>
          <p style="color:var(--text-muted);">你已完成所有对话，等待对手完成...</p>
          <button class="btn btn-outline mt-8" onclick="location.reload()">刷新状态</button>
        </div>`;
      return;
    }

    // Show input for next B turn
    // Build the context: show all turns up to this B turn (including the A line before it)
    const allTurns = this._scenarioTurns;
    let nextBIndex = mySubmittedCount;

    // Find the A turn before this B turn
    let bCount = 0;
    let prevAText = '';
    for (let i = 0; i < allTurns.length; i++) {
      if (allTurns[i].role === 'B') {
        if (bCount === nextBIndex) break;
        bCount++;
      } else {
        prevAText = allTurns[i].text;
      }
    }

    section.innerHTML = `
      ${prevAText ? `<div class="scenario-msg-tip">💡 请回应上面A的对话（说粤语）："${escapeHtml(prevAText)}"</div>` : ''}
      <div class="scenario-input-area">
        <input type="text" id="scenario-turn-input" placeholder="请输入你的粤语回应..." 
               onkeydown="if(event.key==='Enter')App._submitScenarioTurn()" autofocus>
        <button class="btn-send" id="scenario-send-btn" onclick="App._submitScenarioTurn()">发送 💬</button>
      </div>
      <div style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:6px;">
        进度：${mySubmittedCount + 1} / ${totalBTurns} 句对话
      </div>
    `;

    setTimeout(() => {
      const input = document.getElementById('scenario-turn-input');
      if (input) input.focus();
    }, 200);
  },

  async _submitScenarioTurn() {
    const input = document.getElementById('scenario-turn-input');
    const btn = document.getElementById('scenario-send-btn');
    if (!input || !btn) return;

    const answer = input.value.trim();
    if (!answer) {
      showToast('请输入你的回应', 'error');
      return;
    }

    const challengeId = this._scenarioChallenge.id;
    const turnIndex = Object.keys(this._scenarioSubmissions || {}).length;

    input.disabled = true;
    btn.disabled = true;
    btn.textContent = '发送中...';

    try {
      const result = await API.submitScenarioTurn(challengeId, turnIndex, answer);

      // Store result and submission
      if (!this._scenarioSubmissions) this._scenarioSubmissions = {};
      this._scenarioSubmissions[turnIndex] = answer;
      if (!this._scenarioResults) this._scenarioResults = {};
      this._scenarioResults[turnIndex] = { score: result.score, expected: result.expected };

      // Re-render active view
      const main = document.getElementById('main-content');
      this._renderScenarioActive(this._scenarioChallenge, main);

    } catch (e) {
      input.disabled = false;
      btn.disabled = false;
      btn.textContent = '发送 💬';
      showToast(e.message || '发送失败', 'error');
    }
  },

  _renderScenarioResult(challenge, main) {
    const userId = App.currentUser.id;
    const isWinner = challenge.winner_id === userId;
    const isDraw = !challenge.winner_id;

    main.innerHTML = `
      <div class="page-title">🎭 对话对战结果</div>
      <div class="scenario-scene-info">
        📍 ${escapeHtml(challenge.course_title)}（L${challenge.course_level}）
      </div>
      
      <div class="card">
        <div class="vs-display">
          <div class="vs-player">
            ${avatarHtml({ nickname: challenge.challenger_name, avatar_color: challenge.challenger_avatar }, 'avatar-lg')}
            <h3>${escapeHtml(challenge.challenger_name)}</h3>
            <div class="score">${challenge.challenger_score}%</div>
            <div class="vs-winner ${challenge.winner_id === challenge.challenger_id ? 'win' : challenge.winner_id ? 'lose' : 'draw'}">
              ${challenge.winner_id === challenge.challenger_id ? '🏆 胜利' : challenge.winner_id ? '再接再厉' : '🤝'}
            </div>
          </div>
          <div class="vs-vs">VS</div>
          <div class="vs-player">
            ${avatarHtml({ nickname: challenge.opponent_name || '?', avatar_color: challenge.opponent_avatar || '#BDC3C7' }, 'avatar-lg')}
            <h3>${escapeHtml(challenge.opponent_name || '?')}</h3>
            <div class="score">${challenge.opponent_score}%</div>
            <div class="vs-winner ${challenge.winner_id === challenge.opponent_id ? 'win' : challenge.winner_id ? 'lose' : 'draw'}">
              ${challenge.winner_id === challenge.opponent_id ? '🏆 胜利' : challenge.winner_id ? '再接再厉' : '🤝 平局'}
            </div>
          </div>
        </div>
        <div class="scenario-result-overlay mt-16">
          <div class="result-icon">${isWinner ? '🎉' : isDraw ? '🤝' : '💪'}</div>
          <div class="result-verdict" style="color:${isWinner ? 'var(--success)' : isDraw ? 'var(--secondary)' : 'var(--text-light)'};">
            ${isWinner ? '恭喜你赢了！对话水平很棒！' : isDraw ? '平局！双方都很厉害！' : '再接再厉！多练习粤语对话吧！'}
          </div>
        </div>
        <div class="text-center mt-16">
          <button class="btn btn-primary" onclick="location.hash='#/courses'">继续学习</button>
          <button class="btn btn-outline ml-8" onclick="location.hash='#/battles'">查看更多对战</button>
        </div>
      </div>
    `;

    if (isWinner) showAda(AdaMessages.challenge_win);
    else if (!isDraw) showAda(AdaMessages.challenge_lose);
  },

  // ===================== BATTLES CENTER =====================
  async renderBattles() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const [myChallenges, partners, courses, invitations] = await Promise.all([
        API.getMyChallenges(),
        API.getPartners(),
        API.getCourses(),
        API.getChallengeInvitations().catch(() => [])
      ]);

      const pending = myChallenges.filter(c => c.status === 'pending');
      const active = myChallenges.filter(c => c.status === 'active');
      const completed = myChallenges.filter(c => c.status === 'completed');
      const acceptedPartners = partners.filter(p => p.status === 'accepted');

      main.innerHTML = `
        <div class="page-title">⚔️ 对战中心</div>
        
        <div class="tabs">
          <button class="tab active" onclick="App.switchBattleTab('arena', this)">🏟️ 对战广场</button>
          <button class="tab" onclick="App.switchBattleTab('active', this)">🔥 进行中 (${active.length})</button>
          <button class="tab" onclick="App.switchBattleTab('history', this)">📜 历史记录 (${completed.length})</button>
        </div>

        <!-- Arena Tab: Create + Join -->
        <div id="battle-tab-arena">
          <!-- Invitations from partners -->
          ${invitations.length > 0 ? `
            <div class="card mb-16" style="border:2px solid var(--primary);">
              <h3 style="margin-bottom:12px;">📩 来自搭子的对战邀请</h3>
              ${invitations.map(c => `
                <div class="battle-card" style="background:#FFF0E6;border-radius:8px;">
                  <div class="battle-card-info">
                    <div style="font-weight:600;">${escapeHtml(c.course_title)} (L${c.course_level})</div>
                    <div style="font-size:13px;color:var(--text-light);">
                      ${avatarHtml({ nickname: c.challenger_name, avatar_color: c.challenger_avatar }, 'avatar-sm')}
                      <span style="margin-left:6px;">${escapeHtml(c.challenger_name)} 向你发起对战</span>
                    </div>
                    <div style="font-size:12px;color:var(--text-muted);">对战码: <strong>${c.challenge_code || c.id}</strong> · ${timeAgo(c.created_at)}</div>
                  </div>
                  <button class="btn btn-success btn-sm" onclick="App.joinChallenge(${c.id})">接受对战</button>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Quick Start: Challenge a partner -->
          <div class="card mb-16">
            <h3 style="margin-bottom:12px;">🎯 向搭子发起对战</h3>
            ${acceptedPartners.length === 0 
              ? `<p style="color:var(--text-light);">你还没有搭子，<a href="#/partners">去找一个吧</a>！</p>`
              : `<div class="partner-challenge-grid">
                  ${acceptedPartners.map(p => `
                    <div class="partner-challenge-item" onclick="App.quickChallengePartner(${p.id}, '${escapeHtml(p.nickname).replace(/'/g, "\\'")}')">
                      ${avatarHtml(p, 'avatar-sm')}
                      <div style="flex:1;">
                        <div style="font-weight:600;font-size:14px;">${escapeHtml(p.nickname)}</div>
                        <div style="font-size:12px;color:var(--text-light);">${getLevelLabel(p.level)} L${p.level} · ⭐ ${p.score}</div>
                      </div>
                      <span style="font-size:18px;">⚔️</span>
                    </div>
                  `).join('')}
                </div>`
            }
          </div>

          <!-- Join by Code -->
          <div class="card mb-16">
            <h3 style="margin-bottom:12px;">🔑 输入对战码加入</h3>
            <div class="flex gap-8">
              <input type="text" id="battle-code-input" class="form-input" placeholder="输入对战码..." style="flex:1;">
              <button class="btn btn-primary" onclick="App.joinBattleByCode()">加入对战</button>
            </div>
          </div>

          <!-- Pending Challenges (my own) -->
          ${pending.length > 0 ? `
            <div class="card mb-16">
              <h3 style="margin-bottom:12px;">⏳ 我发起的对战</h3>
              ${pending.map(c => `
                <div class="battle-card">
                  <div class="battle-card-info">
                    <div style="font-weight:600;">${escapeHtml(c.course_title)} (L${c.course_level})</div>
                    <div style="font-size:13px;color:var(--text-light);">
                      对战码: <strong>${c.challenge_code || c.id}</strong>
                    </div>
                    <div style="font-size:12px;color:var(--text-muted);">${timeAgo(c.created_at)}</div>
                  </div>
                  <span style="font-size:12px;color:var(--text-muted);">等待搭子加入...</span>
                </div>
              `).join('')}
            </div>
          ` : '<div class="empty-state"><p>暂无待加入的对战</p></div>'}
        </div>

        <!-- Active Tab -->
        <div id="battle-tab-active" style="display:none;">
          ${active.length === 0
            ? '<div class="empty-state"><div class="empty-icon">⚔️</div><h3>没有进行中的对战</h3><p>发起一场对战吧！</p></div>'
            : active.map(c => {
              const isChallenger = c.challenger_id === App.currentUser.id;
              const hasSubmitted = isChallenger ? c.challenger_score > 0 : c.opponent_score > 0;
              const isScenario = c.challenge_mode === 'scenario';
              const challengeUrl = isScenario ? `#/scenario-challenge/${c.id}` : `#/challenge/${c.id}`;
              const actionLabel = isScenario ? '开始对话' : '开始答题';
              const statusLabel = isScenario ? '🎭 情景对战' : (hasSubmitted ? '✅ 已提交 · 等待对方完成...' : '⏳ 请完成答题');
              return `
                <div class="battle-card ${hasSubmitted ? 'submitted' : ''}">
                  <div class="battle-card-info">
                    <div style="font-weight:600;">${isScenario ? '🎭 ' : ''}${escapeHtml(c.course_title)} (L${c.course_level})</div>
                    <div style="font-size:13px;color:var(--text-light);">
                      ${isChallenger ? `对手: ${escapeHtml(c.opponent_name || '?')}` : `发起人: ${escapeHtml(c.challenger_name)}`}
                    </div>
                    <div style="font-size:12px;color:var(--text-muted);">
                      ${statusLabel}
                    </div>
                  </div>
                  ${!hasSubmitted 
                    ? `<button class="btn btn-primary btn-sm" onclick="location.hash='${challengeUrl}'">${actionLabel}</button>`
                    : `<button class="btn btn-outline btn-sm" onclick="location.hash='${challengeUrl}'">查看状态</button>`
                  }
                </div>
              `;
            }).join('')
          }
        </div>

        <!-- History Tab -->
        <div id="battle-tab-history" style="display:none;">
          ${completed.length === 0
            ? '<div class="empty-state"><div class="empty-icon">📜</div><h3>还没有对战记录</h3><p>完成任务后回来看看吧！</p></div>'
            : completed.map(c => {
              const isWinner = c.winner_id === App.currentUser.id;
              const isDraw = !c.winner_id;
              const isScenario = c.challenge_mode === 'scenario';
              return `
                <div class="battle-card ${isWinner ? 'win' : isDraw ? 'draw' : 'lose'}">
                  <div class="battle-card-info">
                    <div style="font-weight:600;">${isScenario ? '🎭 ' : ''}${escapeHtml(c.course_title)} (L${c.course_level})</div>
                    <div style="font-size:13px;color:var(--text-light);">
                      ${escapeHtml(c.challenger_name)} ${c.challenger_score}% vs ${escapeHtml(c.opponent_name || '?')} ${c.opponent_score}%
                    </div>
                    <div style="font-size:12px;color:var(--text-muted);">${isScenario ? '情景对话对战 · ' : ''}${timeAgo(c.created_at)}</div>
                  </div>
                  <span style="font-size:16px;">
                    ${isWinner ? '🏆 胜利' : isDraw ? '🤝 平局' : '💪 再接再厉'}
                  </span>
                </div>
              `;
            }).join('')
          }
        </div>
      `;
    } catch (e) {
      showError(main, e.message);
    }
  },

  switchBattleTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    ['arena', 'active', 'history'].forEach(t => {
      const div = document.getElementById(`battle-tab-${t}`);
      if (div) div.style.display = t === tab ? 'block' : 'none';
    });
  },

  async quickChallengePartner(partnerId, partnerName) {
    try {
      const courses = await API.getCourses();
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal">
          <h3>⚔️ 向 ${escapeHtml(partnerName)} 发起对战</h3>
          <p style="color:var(--text-light);margin-bottom:16px;">选择一门课程来对战</p>
          <select id="quick-challenge-course" class="form-select mb-16">
            <option value="">请选择课程...</option>
            ${courses.map(c => `<option value="${c.id}">L${c.level} - ${escapeHtml(c.title)}</option>`).join('')}
          </select>
          <div class="modal-actions">
            <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">取消</button>
            <button class="btn btn-primary" id="quick-challenge-btn" onclick="App.doQuickChallenge(${partnerId})">发起对战</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async doQuickChallenge(partnerId) {
    const courseId = document.getElementById('quick-challenge-course')?.value;
    if (!courseId) {
      showToast('请选择课程', 'error');
      return;
    }
    try {
      const result = await API.createChallenge(parseInt(courseId));
      document.querySelector('.modal-overlay')?.remove();
      showToast('对战已发起！');
      location.hash = `#/challenge/${result.challengeId}`;
    } catch (e) {
      showToast(e.message, 'error');
    }
  },

  async joinBattleByCode() {
    const code = document.getElementById('battle-code-input')?.value.trim();
    if (!code) {
      showToast('请输入对战码', 'error');
      return;
    }
    try {
      const data = await API.joinChallengeByCode(code);
      showToast('成功加入对战！');
      location.hash = `#/challenge/${data.challengeId}`;
    } catch (e) {
      showToast('对战码无效，请检查后重试', 'error');
    }
  },

  // ===================== LEADERBOARD =====================
  async renderLeaderboard() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const [global, weekly, partnersData] = await Promise.all([
        API.getLeaderboard(),
        API.getWeeklyLeaderboard(),
        API.getPartners()
      ]);

      // Store data for filtering
      this._lbGlobal = global;
      this._lbWeekly = weekly;
      this._lbPartnerIds = new Set(
        (partnersData || []).filter(p => p.status === 'accepted').map(p => p.id)
      );
      this._lbPartnerOnly = false;
      this._lbActiveTab = 'global';

      main.innerHTML = this._buildLeaderboardHtml('global');
    } catch (e) {
      showError(main, e.message);
    }
  },

  _buildLeaderboardHtml(tab) {
    const partnerOnly = this._lbPartnerOnly;
    const partnerIds = this._lbPartnerIds;
    const data = tab === 'global' ? this._lbGlobal : this._lbWeekly;
    const scoreField = tab === 'global' ? 'score' : 'weekly_score';

    // Filter data if partner-only mode
    const filtered = partnerOnly
      ? data.filter(u => partnerIds.has(u.id) || u.id === (this.currentUser ? this.currentUser.id : null))
      : data;

    const tabActive = (t) => t === tab ? ' active' : '';
    const filterActive = partnerOnly ? ' active' : '';
    const filterText = partnerOnly ? '👥 只显示搭子 ✓' : '👥 只显示搭子';

    return `
      <div class="page-title">🏆 排行榜</div>
      
      <div class="tabs">
        <button class="tab${tabActive('global')}" onclick="App.switchLeaderboardTab('global', this)">总积分榜</button>
        <button class="tab${tabActive('weekly')}" onclick="App.switchLeaderboardTab('weekly', this)">本周积分榜</button>
      </div>

      <div class="leaderboard-actions">
        <button class="leaderboard-filter-btn${filterActive}" id="lb-filter-btn" onclick="App.togglePartnerFilter()">
          ${filterText}
        </button>
      </div>

      <div id="lb-global" class="card"${tab === 'weekly' ? ' style="display:none;"' : ''}>
        ${tab === 'global' ? this._renderLeaderboardList(filtered, scoreField) : ''}
      </div>

      <div id="lb-weekly" class="card"${tab === 'global' ? ' style="display:none;"' : ''}>
        ${tab === 'weekly' ? this._renderLeaderboardList(filtered, scoreField) : ''}
      </div>
    `;
  },

  _renderLeaderboardList(data, scoreField) {
    const partnerIds = this._lbPartnerIds;
    const currentId = this.currentUser ? this.currentUser.id : null;
    return data.length === 0
      ? '<div class="empty-state"><p>暂无数据</p></div>'
      : data.map((u, i) => {
          const isPartner = partnerIds.has(u.id) || u.id === currentId;
          return `
            <div class="leaderboard-item" style="display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid var(--border);">
              <div class="rank" style="font-weight:700;font-size:18px;width:32px;text-align:center;">${i < 3 ? ['🥇','🥈','🥉'][i] : `#${i+1}`}</div>
              <div class="avatar" style="background:${u.avatar_color || '#FF6B35'};flex-shrink:0;">${(u.nickname || '?')[0]}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:600;font-size:15px;display:flex;align-items:center;gap:6px;">
                  ${escapeHtml(u.nickname)}
                  ${isPartner ? '<span style="font-size:11px;background:#FFF0E6;color:#FF6B35;padding:1px 6px;border-radius:10px;">搭子</span>' : ''}
                </div>
                <div style="font-size:12px;color:var(--text-light);">${getLevelLabel(u.level)} L${u.level} · ${u.courses_completed || u.weekly_courses || 0}课</div>
              </div>
              <div style="font-weight:700;font-size:18px;color:var(--primary);">${u[scoreField] || 0}</div>
            </div>`;
        }).join('');
  },

  togglePartnerFilter() {
    this._lbPartnerOnly = !this._lbPartnerOnly;
    const tab = this._lbActiveTab || 'global';
    const main = document.getElementById('main-content');
    main.innerHTML = this._buildLeaderboardHtml(tab);
  },

  switchLeaderboardTab(tab, el) {
    this._lbActiveTab = tab;
    const main = document.getElementById('main-content');
    main.innerHTML = this._buildLeaderboardHtml(tab);
  },

  // ===================== PROFILE =====================
  _calendarYear: null,
  _calendarMonth: null,
  _activityData: null,
  _selectedDay: null,

  async renderProfile() {
    const main = document.getElementById('main-content');
    showLoading(main);

    try {
      const [profile, stats] = await Promise.all([
        API.getProfile(),
        API.getStats()
      ]);

      const now = new Date();
      this._calendarYear = now.getFullYear();
      this._calendarMonth = now.getMonth() + 1; // 1-indexed for API

      main.innerHTML = `
        <div class="profile-header">
          ${avatarHtml(profile, 'avatar-lg')}
          <h2 style="margin-top:12px;">${escapeHtml(profile.nickname)}</h2>
          ${levelBadgeHtml(profile.level)}
          ${profile.position ? `<p style="margin-top:8px;color:var(--text-light);">${escapeHtml(profile.position)} @ ${escapeHtml(profile.company || '')}</p>` : ''}
          
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="value">${stats.coursesCompleted}</div>
              <div class="label">已学课程</div>
            </div>
            <div class="profile-stat">
              <div class="value">${stats.totalScore}</div>
              <div class="label">累计积分</div>
            </div>
            <div class="profile-stat">
              <div class="value">${profile.partnerCount}</div>
              <div class="label">学习搭子</div>
            </div>
            <div class="profile-stat">
              <div class="value">${profile.streak_days || 0}</div>
              <div class="label">连续学习</div>
            </div>
          </div>
        </div>

        <div class="checkin-card" id="checkin-root">
          <div class="checkin-header">
            <div class="checkin-tabs">
              <button class="checkin-tab active" data-tab="streak" onclick="App._switchCheckinTab('streak')">连续打卡</button>
              <button class="checkin-tab" data-tab="total" onclick="App._switchCheckinTab('total')">累计打卡</button>
            </div>
            <div class="streak-display">
              <div class="streak-number">
                <span class="number" id="checkin-number">0</span>
                <span class="heart-icon" id="checkin-heart">💔</span>
              </div>
              <div class="streak-label" id="checkin-label">天连续打卡</div>
            </div>
            <div class="motivation-bubble" id="checkin-motivation">加载中...</div>
          </div>
          <div class="challenge-card" id="checkin-challenge"></div>
          <div class="calendar-section" id="checkin-calendar-section">
            <div class="calendar-header">
              <button class="calendar-nav-btn" onclick="App._navigateCheckinCalendar(-1)">◀</button>
              <span class="calendar-month-label" id="checkin-month-label">6月 2026</span>
              <button class="calendar-nav-btn" onclick="App._navigateCheckinCalendar(1)">▶</button>
            </div>
            <div class="calendar-weekdays">
              <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
            </div>
            <div class="calendar-grid" id="calendarGrid"></div>
          </div>
          <div class="makeup-bar" id="makeupBar" style="display:none;">
            <span class="makeup-hint" id="makeupHint">请选择你想要补卡的日期</span>
            <button class="btn btn-sm btn-outline" onclick="App._cancelMakeup()">取消补卡</button>
          </div>
        </div>

        <div class="card mb-16" style="margin-top:16px;">
          <h3 style="margin-bottom:16px;">📚 最近完成的课程</h3>
          ${(stats.recentCourses || []).length === 0
            ? '<div class="empty-state"><p>还没有完成任何课程</p></div>'
            : (stats.recentCourses || []).map(c => `
              <div class="feed-item">
                <div class="feed-content">
                  <div class="feed-action">📚 ${escapeHtml(c.title)} (L${c.level})</div>
                  <div class="feed-time">得分: ${c.score}% · ${timeAgo(c.completed_at)}</div>
                </div>
              </div>
            `).join('')
          }
        </div>

        <div class="card mb-16">
          <h3 style="margin-bottom:16px;">📊 评估历史</h3>
          <div id="assessment-history">加载中...</div>
        </div>

        <div class="text-center mb-24">
          <button class="btn btn-outline" onclick="location.hash='#/assess'">🔄 重新评估</button>
        </div>
      `;

      // Load checkin data
      this._loadCheckin();

      // Auto checkin today (silently)
      API.checkinToday().catch(() => {});

      // Load assessment history
      try {
        const history = await API.getAssessmentHistory();
        const histDiv = document.getElementById('assessment-history');
        if (history.length === 0) {
          histDiv.innerHTML = '<div class="empty-state"><p>还没有评估记录</p></div>';
        } else {
          histDiv.innerHTML = history.map(h => `
            <div class="feed-item">
              <div class="feed-content">
                <div class="feed-action">📊 评估得分: ${h.score}分 — ${getLevelLabel(h.level)} L${h.level}</div>
                <div class="feed-time">${timeAgo(h.created_at)}</div>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        document.getElementById('assessment-history').innerHTML = '<p style="color:var(--text-muted);">加载失败</p>';
      }
    } catch (e) {
      showError(main, e.message);
    }
  },

  // ==================== Checkin Calendar ====================
  _checkinTab: 'streak', // 'streak' | 'total'
  _checkinData: null,
  _makeupMode: false,
  _makeupSelectedDate: null,

  motivationTexts: {
    0: '💪 一息尚存，重新点燃心火吧！',
    1: '🔥 好的开始！坚持下去！',
    3: '🎉 连续3天！你已经迈出了第一步！',
    7: '🌟 连续7天！习惯正在养成！',
    14: '⚡ 连续14天！你已经超过大多数人了！',
    21: '🏆 连续21天！新习惯已经养成！',
    30: '👑 连续30天！你是真正的粤语达人！',
  },

  _getMotivation(streak) {
    const thresholds = Object.keys(this.motivationTexts).map(Number).sort((a, b) => b - a);
    for (const t of thresholds) {
      if (streak >= t) return this.motivationTexts[t];
    }
    return this.motivationTexts[0];
  },

  async _loadCheckin() {
    try {
      this._checkinData = await API.getCheckin(this._calendarYear, this._calendarMonth);
      this._renderCheckin();
    } catch (e) {
      console.error('Checkin load error:', e);
      const grid = document.getElementById('calendarGrid');
      if (grid) grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">打卡数据加载失败</p>';
    }
  },

  _renderCheckin() {
    const data = this._checkinData;
    if (!data) return;

    // Update top numbers
    this._renderCheckinHeader(data);
    // Update challenge
    this._renderCheckinChallenge(data);
    // Render calendar
    this._renderCheckinCalendar(data);
    // Show Ada
    this._showAdaOnCheckin(data);
  },

  _renderCheckinHeader(data) {
    const displayValue = this._checkinTab === 'streak' ? data.streakDays : data.totalDays;
    const labelText = this._checkinTab === 'streak' ? '天连续打卡' : '天累计打卡';

    const numEl = document.getElementById('checkin-number');
    const heartEl = document.getElementById('checkin-heart');
    const labelEl = document.getElementById('checkin-label');
    const motivationEl = document.getElementById('checkin-motivation');

    if (numEl) numEl.textContent = displayValue;
    if (labelEl) labelEl.textContent = labelText;

    if (heartEl) {
      if (displayValue === 0) {
        heartEl.textContent = '💔';
        heartEl.className = 'heart-icon broken';
      } else {
        heartEl.textContent = '❤️';
        heartEl.className = 'heart-icon';
      }
    }

    if (motivationEl) {
      motivationEl.textContent = this._getMotivation(data.streakDays);
    }

    // Update tab styles
    document.querySelectorAll('.checkin-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === this._checkinTab);
    });
  },

  _renderCheckinChallenge(data) {
    const container = document.getElementById('checkin-challenge');
    if (!container) return;

    const challenge = (data.challenges || [])[0];
    if (!challenge) return;

    const progress = Math.min(challenge.progress, challenge.target);
    const pct = Math.round((progress / challenge.target) * 100);
    const isComplete = progress >= challenge.target;

    container.innerHTML = `
      <div class="challenge-header">
        <span class="challenge-icon">🎯</span>
        <span class="challenge-title">${challenge.name}</span>
      </div>
      ${isComplete ? `
        <div class="challenge-complete">🎉 挑战完成！奖励已解锁 🎁</div>
      ` : `
        <div class="challenge-progress">
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%"></div>
            <div class="progress-start">●</div>
            <div class="progress-end">${challenge.reward}</div>
          </div>
          <span class="challenge-target">${challenge.target}天</span>
        </div>
      `}
    `;
  },

  _renderCheckinCalendar(data) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    const year = data.year;
    const month = data.month;
    const today = new Date();
    const todayY = today.getFullYear();
    const todayM = today.getMonth() + 1;
    const todayD = today.getDate();

    // Update month label
    const label = document.getElementById('checkin-month-label');
    if (label) {
      label.textContent = `${month}月 ${year}`;
    }

    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    // Build daily map
    const dailyMap = {};
    (data.daily || []).forEach(d => { dailyMap[d.day] = d; });

    let cellsHtml = '';
    // Empty cells before month start
    for (let i = 0; i < firstDay; i++) {
      cellsHtml += '<div class="calendar-cell empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = dailyMap[day];
      const isToday = (year === todayY && month === todayM && day === todayD);
      const isFuture = (year > todayY) || (year === todayY && month > todayM) || (year === todayY && month === todayM && day > todayD);
      const isPast = !isToday && !isFuture;

      let cellClass = 'calendar-cell';
      let cellContent = day;
      let clickHandler = '';

      if (isToday) {
        cellClass += ' today';
        cellContent = '今';
      } else if (dayData && dayData.checked) {
        if (dayData.isMakeup) {
          cellClass += ' made-up';
          cellContent = '✓';
        } else {
          cellClass += ' checked';
          cellContent = '✓';
        }
      } else if (isPast && data.canMakeUp) {
        cellClass += ' can-makeup';
        cellContent = '补';
        clickHandler = `onclick="App._onMakeupClick(${year},${month},${day})"`;
      } else if (isFuture) {
        cellClass += ' future';
      }

      // Highlight if in makeup mode and this is selected
      if (this._makeupMode && this._makeupSelectedDate && 
          this._makeupSelectedDate.year === year && 
          this._makeupSelectedDate.month === month && 
          this._makeupSelectedDate.day === day) {
        cellClass += ' selected';
      }

      cellsHtml += `<div class="${cellClass}" ${clickHandler}>${cellContent}</div>`;
    }

    grid.innerHTML = cellsHtml;

    // Show/hide makeup bar
    this._updateMakeupBar();
  },

  _switchCheckinTab(tab) {
    this._checkinTab = tab;
    if (this._checkinData) {
      this._renderCheckinHeader(this._checkinData);
    }
  },

  async _navigateCheckinCalendar(delta) {
    this._calendarMonth += delta;
    if (this._calendarMonth < 1) { this._calendarMonth = 12; this._calendarYear--; }
    if (this._calendarMonth > 12) { this._calendarMonth = 1; this._calendarYear++; }
    this._makeupMode = false;
    this._makeupSelectedDate = null;
    await this._loadCheckin();
  },

  _onMakeupClick(year, month, day) {
    if (!this._makeupMode) {
      // Enter makeup mode
      this._makeupMode = true;
      this._makeupSelectedDate = { year, month, day };
      this._renderCheckinCalendar(this._checkinData);
      // Ada says something
      this._showAdaCheckin('thinking', '補卡會扣你啲積分㗎喎，下次記得準時學啦！😜');
    } else if (this._makeupSelectedDate && 
               this._makeupSelectedDate.year === year &&
               this._makeupSelectedDate.month === month &&
               this._makeupSelectedDate.day === day) {
      // Confirm makeup
      this._confirmMakeup(year, month, day);
    } else {
      // Select different day
      this._makeupSelectedDate = { year, month, day };
      this._renderCheckinCalendar(this._checkinData);
    }
  },

  async _confirmMakeup(year, month, day) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (!confirm(`确认补卡 ${month}月${day}日 吗？将消耗 10 积分。`)) return;

    try {
      const result = await API.makeupCheckin(dateStr);
      if (result.success) {
        // Confetti animation
        this._triggerConfetti();
        // Show Ada celebration
        this._showAdaCheckin('laugh', result.adaText);
        // Reload data
        this._makeupMode = false;
        this._makeupSelectedDate = null;
        await this._loadCheckin();
      }
    } catch (e) {
      alert(e.message || '补卡失败');
    }
  },

  _cancelMakeup() {
    this._makeupMode = false;
    this._makeupSelectedDate = null;
    this._renderCheckinCalendar(this._checkinData);
    this._updateMakeupBar();
  },

  _updateMakeupBar() {
    const bar = document.getElementById('makeupBar');
    const hint = document.getElementById('makeupHint');
    if (!bar || !hint) return;

    if (this._makeupMode && this._makeupSelectedDate) {
      bar.style.display = 'flex';
      hint.innerHTML = `已选择 <strong>${this._makeupSelectedDate.month}月${this._makeupSelectedDate.day}日</strong> 补卡 · 消耗 <span class="cost">10积分</span> · 再次点击确认`;
    } else {
      bar.style.display = 'none';
    }
  },

  _showAdaOnCheckin(data) {
    // Remove existing ada bubble
    const existing = document.getElementById('ada-checkin-bubble');
    if (existing) existing.remove();

    const bubble = document.createElement('div');
    bubble.id = 'ada-checkin-bubble';
    bubble.className = 'ada-checkin-bubble';

    const streak = data.streakDays;
    let mood = 'sad';
    let text = '';

    if (streak === 0) {
      mood = 'sad';
      text = '唔緊要！今日開始重新黎過，我陪你一齊學！💪';
    } else if (streak >= 3 && streak < 7) {
      mood = 'proud';
      text = `連續${streak}日！犀利喎！仲有${7 - streak}日就一星期啦，加油！`;
    } else if (streak >= 7) {
      mood = 'happy';
      text = `連續${streak}日打卡！你嘅粵語越嚟越好！🌟`;
    } else {
      mood = 'happy';
      text = '早晨！今日又開始新嘅學習啦！';
    }

    this._showAdaCheckin(mood, text);
  },

  _showAdaCheckin(mood, text) {
    const existing = document.getElementById('ada-checkin-bubble');
    if (existing) existing.remove();

    const moodEmoji = { sad: '😿', happy: '😸', proud: '🦁', thinking: '🤔', laugh: '😹' };

    const bubble = document.createElement('div');
    bubble.id = 'ada-checkin-bubble';
    bubble.className = 'ada-checkin-bubble';
    bubble.innerHTML = `
      <div class="ada-checkin-speech">${text}</div>
      <div class="ada-checkin-avatar mood-${mood}">${moodEmoji[mood] || '🦁'}</div>
    `;
    document.body.appendChild(bubble);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (bubble.parentNode) bubble.remove();
    }, 5000);
  },

  _triggerConfetti() {
    const colors = ['#e8a838', '#2d6a4f', '#FF6B35', '#4ECDC4', '#45B7D1', '#FFD166'];
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = -(Math.random() * 100) + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.5 + 's';
      piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      document.body.appendChild(piece);
      setTimeout(() => { if (piece.parentNode) piece.remove(); }, 3500);
    }
  },
};

// ===================== Helper Functions =====================
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function courseCardHtml(course) {
  const statusClass = `status-${course.progress || 'not_started'}`;
  const statusLabels = { completed: '✅ 已完成', in_progress: '📖 学习中', not_started: '📌 未开始' };
  
  return `
    <div class="course-card ${course.progress === 'completed' ? 'completed' : ''}" data-course-id="${course.id}">
      <div class="course-icon">📚</div>
      <div class="course-info">
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.description || '')}</p>
        <div class="course-meta">
          ${levelBadgeHtml(course.level)}
          <span>${course.difficulty_label || ''}</span>
          ${course.score ? `<span style="margin-left:4px;">得分: ${course.score}%</span>` : ''}
        </div>
      </div>
      <span class="course-status ${statusClass}">${statusLabels[course.progress] || '📌 未开始'}</span>
    </div>
  `;
}

function partnerCardHtml(partner) {
  return `
    <div class="partner-card" onclick="location.hash='#/partner/${partner.id}'" style="cursor:pointer;">
      ${avatarHtml(partner)}
      <div class="partner-info">
        <h3>${escapeHtml(partner.nickname)}</h3>
        <div class="partner-meta">
          ${levelBadgeHtml(partner.level)}
          <span style="margin-left:8px;">⭐ ${partner.score} 分</span>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); App.quickChallengePartner(${partner.id}, '${escapeHtml(partner.nickname).replace(/'/g, "\\'")}')">⚔️ 对战</button>
      <span style="font-size:20px;cursor:pointer;">→</span>
    </div>
  `;
}

function feedItemHtml(feed) {
  const actionIcons = {
    complete_course: '✅',
    start_course: '📖',
    found_partner: '🤝',
    challenge: '⚔️',
    challenge_complete: '🏆'
  };
  const icon = actionIcons[feed.action] || '📌';

  return `
    <div class="feed-item">
      ${avatarHtml(feed, 'avatar-sm')}
      <div class="feed-content">
        <div class="feed-user">${escapeHtml(feed.nickname)}</div>
        <div class="feed-action">${icon} ${escapeHtml(feed.details)}</div>
        <div class="feed-time">${timeAgo(feed.created_at)}</div>
      </div>
    </div>
  `;
}

function leaderboardItemHtml(user, index, scoreField) {
  const rank = index + 1;
  const rankClass = rank <= 3 ? `top-${rank}` : '';
  
  return `
    <div class="leaderboard-item">
      <div class="leaderboard-rank ${rankClass}">
        ${rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
      </div>
      ${avatarHtml(user, 'avatar-sm')}
      <div class="leaderboard-info">
        <h3>${escapeHtml(user.nickname)}</h3>
        <p>${levelBadgeHtml(user.level)} · 📚 ${user.courses_completed || 0} 课</p>
      </div>
      <div class="leaderboard-score">⭐ ${user[scoreField] || 0}</div>
    </div>
  `;
}

function renderDimensionScores(details) {
  if (!details) return '';
  const dims = [
    { key: 'listening', label: '👂 听力', totalKey: 'listening_total' },
    { key: 'speaking', label: '🗣️ 情景', totalKey: 'speaking_total' },
    { key: 'reading', label: '📖 阅读', totalKey: 'reading_total' },
    { key: 'vocabulary', label: '✍️ 词汇', totalKey: 'vocabulary_total' }
  ];

  return dims.map(d => {
    const correct = details[d.key] || 0;
    const total = details[d.totalKey] || 1;
    const pct = Math.round((correct / total) * 100);
    return `
      <div class="dimension-score">
        <div class="dimension-label">${d.label}</div>
        <div class="dimension-bar">
          <div class="dimension-fill ${d.key}" style="width:${pct}%"></div>
        </div>
        <span style="font-size:13px;font-weight:600;">${correct}/${total}</span>
      </div>
    `;
  }).join('');
}

// ===================== Global logout function =====================
async function logout() {
  try {
    await API.logout();
    App.currentUser = null;
    hideAda();
    location.hash = '#/';
    App.showLogin();
  } catch (e) {
    App.currentUser = null;
    location.reload();
  }
}

// ===================== Handle Enter key on login =====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    if (loginForm && loginForm.style.display !== 'none') {
      App.handleLogin();
    } else if (regForm && regForm.style.display !== 'none') {
      App.handleRegister();
    }
  }
});

// ===================== Init App =====================
document.addEventListener('DOMContentLoaded', () => App.init());
