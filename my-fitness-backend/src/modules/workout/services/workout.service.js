import { workoutRepository } from '../repositories/workout.repository.js';
import {
  WorkoutNotFoundError,
  InvalidWorkoutPlanError,
  UnauthorizedWorkoutAccessError,
} from '../errors/workout.errors.js';

export const workoutService = {
  async createTemplate(userId, payload) {
    return workoutRepository.createTemplate({
      ...payload,
      createdBy: userId,
      isSystem: false,
    });
  },

  async listTemplates() {
    return workoutRepository.listTemplates();
  },

  async createCustomWorkout(userId, payload) {
    return workoutRepository.createCustomWorkout({
      userId,
      ...payload,
    });
  },

  async listCustomWorkouts(userId) {
    return workoutRepository.listCustomWorkouts(userId);
  },

  async createPlan(userId, payload) {
    if (!Array.isArray(payload.days) || payload.days.length !== 7) {
      throw new InvalidWorkoutPlanError('A weekly plan must contain exactly 7 days');
    }

    return workoutRepository.createPlan({
      userId,
      ...payload,
    });
  },

  async listPlans(userId) {
    return workoutRepository.listPlans(userId);
  },

  async getPlanById(userId, planId) {
    const plan = await workoutRepository.findPlanById(planId);
    if (!plan) {
      throw new WorkoutNotFoundError();
    }
    if (plan.userId.toString() !== userId) {
      throw new UnauthorizedWorkoutAccessError();
    }
    return plan;
  },

  async createSession(userId, payload) {
    return workoutRepository.createSession({
      userId,
      ...payload,
    });
  },

  async listSessions(userId) {
    return workoutRepository.listSessions(userId);
  },

  async getSessionById(userId, sessionId) {
    const session = await workoutRepository.findSessionById(sessionId);
    if (!session) {
      throw new WorkoutNotFoundError();
    }
    if (session.userId.toString() !== userId) {
      throw new UnauthorizedWorkoutAccessError();
    }
    return session;
  },

  async updateSession(userId, sessionId, payload) {
    const session = await workoutRepository.findSessionById(sessionId);
    if (!session) {
      throw new WorkoutNotFoundError();
    }
    if (session.userId.toString() !== userId) {
      throw new UnauthorizedWorkoutAccessError();
    }
    return workoutRepository.updateSession(sessionId, payload);
  },

  async deleteSession(userId, sessionId) {
    const session = await workoutRepository.findSessionById(sessionId);
    if (!session) {
      throw new WorkoutNotFoundError();
    }
    if (session.userId.toString() !== userId) {
      throw new UnauthorizedWorkoutAccessError();
    }
    return workoutRepository.deleteSession(sessionId);
  },

  async logSessionExercise(sessionId, payload) {
    const session = await workoutRepository.findSessionById(sessionId);
    if (!session) {
      throw new WorkoutNotFoundError();
    }

    session.exercises = payload.exercises;
    session.status = 'completed';
    await session.save();

    return session;
  },
};