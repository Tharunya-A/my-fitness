import apiClient from '../../../config/api.config.js';

export const workoutApi = {
  // --- PLANS ---
  // POST /workout/plans
  createPlan: async (planData) => {
    const response = await apiClient.post('/workout/plans', planData);
    return response.data;
  },

  // GET /workout/plans
  getPlans: async () => {
    const response = await apiClient.get('/workout/plans');
    return response.data;
  },

  // GET /workout/plans/:id
  getPlanById: async (id) => {
    const response = await apiClient.get(`/workout/plans/${id}`);
    return response.data;
  },

  // --- TEMPLATES & CUSTOM WORKOUTS ---
  // GET /workout/templates
  getTemplates: async () => {
    const response = await apiClient.get('/workout/templates');
    return response.data;
  },

  // POST /workout/templates
  createTemplate: async (templateData) => {
    const response = await apiClient.post('/workout/templates', templateData);
    return response.data;
  },

  // GET /workout/custom
  getCustomWorkouts: async () => {
    const response = await apiClient.get('/workout/custom');
    return response.data;
  },

  // POST /workout/custom
  createCustomWorkout: async (workoutData) => {
    const response = await apiClient.post('/workout/custom', workoutData);
    return response.data;
  },

  // --- SESSIONS & LOGGING ---
  // POST /workout/sessions
  createSession: async (sessionData) => {
    const response = await apiClient.post('/workout/sessions', sessionData);
    return response.data;
  },

  // GET /workout/sessions
  getSessions: async () => {
    const response = await apiClient.get('/workout/sessions');
    return response.data;
  },

  // GET /workout/sessions/:id
  getSessionById: async (id) => {
    const response = await apiClient.get(`/workout/sessions/${id}`);
    return response.data;
  },

  // POST /workout/sessions/:id/log
  logSessionExercise: async (id, exercisesData) => {
    const response = await apiClient.post(`/workout/sessions/${id}/log`, {
      exercises: exercisesData,
    });
    return response.data;
  },
};