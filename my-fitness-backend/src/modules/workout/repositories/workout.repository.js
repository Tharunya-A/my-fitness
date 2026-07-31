import {
  WorkoutTemplate,
  CustomWorkout,
  WorkoutPlan,
  WorkoutSession,
} from '../models/workout.model.js';

export const workoutRepository = {
  async createTemplate(input) {
    return WorkoutTemplate.create(input);
  },

  async listTemplates() {
    return WorkoutTemplate.find().sort({ createdAt: -1 });
  },

  async createCustomWorkout(input) {
    return CustomWorkout.create(input);
  },

  async listCustomWorkouts(userId) {
    return CustomWorkout.find({ userId }).sort({ createdAt: -1 });
  },

  async createPlan(input) {
    return WorkoutPlan.create(input);
  },

  async listPlans(userId) {
    return WorkoutPlan.find({ userId }).sort({ weekStartDate: -1 });
  },

  async createSession(input) {
    return WorkoutSession.create(input);
  },

  async listSessions(userId) {
    return WorkoutSession.find({ userId }).sort({ actualDate: -1 });
  },

  async updateSession(sessionId, payload) {
    return WorkoutSession.findByIdAndUpdate(sessionId, payload, { new: true });
  },

  async findSessionById(sessionId) {
    return WorkoutSession.findById(sessionId);
  },

  async findPlanById(planId) {
    return WorkoutPlan.findById(planId);
  },

  async findSessionById(sessionId) {
    return WorkoutSession.findById(sessionId);
  },

  async updateSession(sessionId, payload) {
    return WorkoutSession.findByIdAndUpdate(sessionId, payload, { new: true });
  },

  async deleteSession(sessionId) {
    return WorkoutSession.findByIdAndDelete(sessionId);
  },
};