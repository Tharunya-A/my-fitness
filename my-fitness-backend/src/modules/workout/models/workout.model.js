import mongoose from 'mongoose';

const setSchema = new mongoose.Schema(
  {
    reps: { type: Number, default: null },
    weight: { type: Number, default: null },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const exerciseLogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: [setSchema],
  },
  { _id: false }
);

const dayPlanSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: String,
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      required: true,
    },
    workoutType: {
      type: String,
      enum: ['template', 'custom', 'rest'],
      default: 'rest',
    },
    workoutId: { type: mongoose.Schema.Types.ObjectId, default: null },
    sessionDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['planned', 'completed', 'skipped'],
      default: 'planned',
    },
    note: { type: String, default: '' },
  },
  { _id: false }
);

const workoutTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    targetMuscles: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    gifUrl: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    category: { type: String, default: 'general' },
    isSystem: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true, collection: 'workout_templates' }
);

const customWorkoutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    targetMuscles: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    gifUrl: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    category: { type: String, default: 'custom' },
  },
  { timestamps: true, collection: 'custom_workouts' }
);

const workoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    days: [
      {
        dayOfWeek: {
          type: String,
          enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          required: true,
        },
        exercises: [String],
      },
    ],
  },
  { timestamps: true, collection: 'workout_plans' }
);

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    planId: { type: mongoose.Schema.Types.ObjectId, default: null },
    workoutType: {
      type: String,
      enum: ['template', 'custom'],
      required: true,
    },
    workoutId: { type: mongoose.Schema.Types.ObjectId, required: true },
    actualDate: { type: Date, required: true },
    scheduledDayOfWeek: {
      type: String,
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      default: null,
    },
    status: {
      type: String,
      enum: ['planned', 'in_progress', 'completed'],
      default: 'planned',
    },
    notes: { type: String, default: '' },
    exercises: [exerciseLogSchema],
  },
  { timestamps: true, collection: 'workout_sessions' }
);

export const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
export const CustomWorkout = mongoose.model('CustomWorkout', customWorkoutSchema);
export const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);
export const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);