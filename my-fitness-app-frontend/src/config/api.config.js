export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
  },
  WORKOUT: {
    PLANS: '/workout/plans',
    TEMPLATES: '/workout/templates',
    CUSTOM: '/workout/custom',
    SESSIONS: '/workout/sessions',
    LOG_SESSION: (id) => `/workout/sessions/${id}/log`,
  },
  HEALTH: {
    MEASUREMENTS: '/health/measurements',
    BIOMARKERS: '/health/biomarkers',
    UPLOAD_REPORT: '/health/reports/upload',
    REPORTS: '/health/reports',
    PREVIEW_REPORT: (id) => `/health/reports/${id}/preview`,
  },
  BILLING: {
    CHECKOUT: '/billing/checkout',
    VERIFY: '/billing/verify',
    STATUS: '/billing/status',
    PREMIUM_FEATURE: '/billing/premium-feature',
  },
};