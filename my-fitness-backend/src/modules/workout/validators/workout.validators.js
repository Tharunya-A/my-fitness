import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().trim().min(2),
  weekStartDate: z.string().datetime(),
  days: z.array(
    z.object({
      dayOfWeek: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
      workoutType: z.enum(['template', 'custom', 'rest']).optional(),
      workoutId: z.string().optional(),
      sessionDate: z.string().datetime().optional(),
      status: z.enum(['planned', 'completed', 'skipped']).optional(),
      note: z.string().optional(),
    })
  ).length(7),
}).strict();

export const createTemplateSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().optional(),
  targetMuscles: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  gifUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  category: z.string().optional(),
}).strict();

export const createCustomWorkoutSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().optional(),
  targetMuscles: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  gifUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  category: z.string().optional(),
}).strict();

export const createSessionSchema = z.object({
  planId: z.string().optional(),
  workoutType: z.enum(['template', 'custom']),
  workoutId: z.string(),
  actualDate: z.string().datetime(),
  scheduledDayOfWeek: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']).optional(),
  status: z.enum(['planned', 'in_progress', 'completed']).optional(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string().trim().min(1),
      sets: z.array(
        z.object({
          reps: z.number().int().min(0).optional(),
          weight: z.number().min(0).optional(),
          completed: z.boolean().optional(),
        })
      ).optional(),
    })
  ).optional(),
}).strict();

export const logSessionExerciseSchema = z.object({
  exercises: z.array(
    z.object({
      name: z.string().trim().min(1),
      sets: z.array(
        z.object({
          reps: z.number().int().min(0).optional(),
          weight: z.number().min(0).optional(),
          completed: z.boolean().optional(),
        })
      ).optional(),
    })
  ),
}).strict();

export const updateSessionSchema = z.object({
  actualDate: z.string().datetime().optional(),
  scheduledDayOfWeek: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']).optional(),
  status: z.enum(['planned', 'in_progress', 'completed']).optional(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string().trim().min(1),
      sets: z.array(
        z.object({
          reps: z.number().int().min(0).optional(),
          weight: z.number().min(0).optional(),
          completed: z.boolean().optional(),
        })
      ).optional(),
    })
  ).optional(),
}).strict();