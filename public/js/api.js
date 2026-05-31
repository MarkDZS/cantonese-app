// ===================== API Client =====================
const API = {
  async request(method, url, body = null) {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin'
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || '请求失败');
    }

    return data;
  },

  // Auth
  register: (body) => API.request('POST', '/api/register', body),
  login: (body) => API.request('POST', '/api/login', body),
  logout: () => API.request('POST', '/api/logout'),
  getProfile: () => API.request('GET', '/api/user/profile'),
  updateProfile: (body) => API.request('PUT', '/api/user/profile', body),
  getStats: () => API.request('GET', '/api/user/stats'),

  // Partners
  getPartners: () => API.request('GET', '/api/partners'),
  recommendPartners: () => API.request('GET', '/api/partners/recommend'),
  invitePartner: () => API.request('POST', '/api/partners/invite'),
  joinPartner: (code) => API.request('POST', '/api/partners/join', { code }),
  requestPartner: (userId) => API.request('POST', `/api/partners/request/${userId}`),
  respondPartner: (relationId, action) => API.request('PUT', `/api/partners/respond/${relationId}`, { action }),
  deletePartner: (relationId) => API.request('DELETE', `/api/partners/${relationId}`),
  getPartnerFeed: (partnerId) => API.request('GET', `/api/partners/${partnerId}/feed`),

  // Assessment
  getAssessmentQuestions: () => API.request('GET', '/api/assessment/questions'),
  submitAssessment: (answers) => API.request('POST', '/api/assessment/submit', { answers }),
  getAssessmentHistory: () => API.request('GET', '/api/assessment/history'),

  // Courses
  getCourses: (level) => API.request('GET', `/api/courses${level ? `?level=${level}` : ''}`),
  getRecommendedCourses: () => API.request('GET', '/api/courses/recommended'),
  getCourse: (id) => API.request('GET', `/api/courses/${id}`),
  startCourse: (id) => API.request('POST', `/api/courses/${id}/start`),
  completeCourse: (id, score) => API.request('POST', `/api/courses/${id}/complete`, { score }),

  // Practice
  getPracticeQuestions: (courseId) => API.request('GET', `/api/courses/${courseId}/practice`),
  submitPractice: (courseId, answers) => API.request('POST', `/api/courses/${courseId}/practice/submit`, { answers }),

  // Challenges
  createChallenge: (courseId) => API.request('POST', '/api/challenges/create', { courseId }),
  getChallenge: (id) => API.request('GET', `/api/challenges/${id}`),
  joinChallenge: (id) => API.request('POST', `/api/challenges/${id}/join`),
  joinChallengeByCode: (code) => API.request('POST', '/api/challenges/join-by-code', { code }),
  submitChallenge: (id, answers) => API.request('POST', `/api/challenges/${id}/submit`, { answers }),
  getMyChallenges: () => API.request('GET', '/api/challenges/my'),
  getChallengeInvitations: () => API.request('GET', '/api/challenges/invitations'),

  // Leaderboard
  getLeaderboard: () => API.request('GET', '/api/leaderboard'),
  getWeeklyLeaderboard: () => API.request('GET', '/api/leaderboard/weekly'),

  // Feed
  getFeed: () => API.request('GET', '/api/feed')
};
