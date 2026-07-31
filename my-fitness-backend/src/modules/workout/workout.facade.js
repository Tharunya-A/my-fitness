import workoutRoutes from './routes/workout.routes.js';

export const registerWorkoutModule = (app) => {
  app.use('/workout', workoutRoutes);
};