import { workoutService } from '../services/workout.service.js';
import {
  createPlanSchema,
  createTemplateSchema,
  createCustomWorkoutSchema,
  createSessionSchema,
  logSessionExerciseSchema,
} from '../validators/workout.validators.js';

export const workoutController = {
  async createPlan(req, res, next) {
    try {
      const parsed = createPlanSchema.parse(req.body);
      const result = await workoutService.createPlan(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async listPlans(req, res, next) {
    try {
      const result = await workoutService.listPlans(req.user.sub);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async createTemplate(req, res, next) {
    try {
      const parsed = createTemplateSchema.parse(req.body);
      const result = await workoutService.createTemplate(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async listTemplates(req, res, next) {
    try {
      const result = await workoutService.listTemplates();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async createCustomWorkout(req, res, next) {
    try {
      const parsed = createCustomWorkoutSchema.parse(req.body);
      const result = await workoutService.createCustomWorkout(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async listCustomWorkouts(req, res, next) {
    try {
      const result = await workoutService.listCustomWorkouts(req.user.sub);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async createSession(req, res, next) {
    try {
      const parsed = createSessionSchema.parse(req.body);
      const result = await workoutService.createSession(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async listSessions(req, res, next) {
    try {
      const result = await workoutService.listSessions(req.user.sub);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async logSessionExercise(req, res, next) {
    try {
      const parsed = logSessionExerciseSchema.parse(req.body);
      const result = await workoutService.logSessionExercise(req.params.id, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
  async getPlanById(req, res, next) {
    try {
      const result = await workoutService.getPlanById(req.user.sub, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getSessionById(req, res, next) {
    try {
      const result = await workoutService.getSessionById(req.user.sub, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async updateSession(req, res, next) {
    try {
      const parsed = updateSessionSchema.parse(req.body);
      const result = await workoutService.updateSession(req.user.sub, req.params.id, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async deleteSession(req, res, next) {
    try {
      const result = await workoutService.deleteSession(req.user.sub, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};