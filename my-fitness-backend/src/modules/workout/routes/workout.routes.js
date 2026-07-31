import express from 'express';
import { workoutController } from '../controllers/workout.controller.js';
import { authenticate } from '../../../shared/middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /workout/plans:
 *   post:
 *     tags: [Workout]
 *     summary: Create a weekly workout plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, weekStartDate, days]
 *             properties:
 *               name:
 *                 type: string
 *               weekStartDate:
 *                 type: string
 *                 format: date-time
 *               days:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     dayOfWeek:
 *                       type: string
 *                       enum: [mon, tue, wed, thu, fri, sat, sun]
 *                     workoutType:
 *                       type: string
 *                       enum: [template, custom, rest]
 *                     workoutId:
 *                       type: string
 *                     sessionDate:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       enum: [planned, completed, skipped]
 *                     note:
 *                       type: string
 *     responses:
 *       201:
 *         description: Workout plan created successfully
 */
router.post('/plans', authenticate, workoutController.createPlan);

/**
 * @openapi
 * /workout/plans:
 *   get:
 *     tags: [Workout]
 *     summary: Get workout plans for the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout plans fetched successfully
 */
router.get('/plans', authenticate, workoutController.listPlans);

/**
 * @openapi
 * /workout/plans/{id}:
 *   get:
 *     tags: [Workout]
 *     summary: Get one workout plan by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout plan fetched successfully
 */
router.get('/plans/:id', authenticate, workoutController.getPlanById);

/**
 * @openapi
 * /workout/templates:
 *   post:
 *     tags: [Workout]
 *     summary: Create a reusable workout template
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               targetMuscles:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               gifUrl:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Workout template created successfully
 */
router.post('/templates', authenticate, workoutController.createTemplate);

/**
 * @openapi
 * /workout/templates:
 *   get:
 *     tags: [Workout]
 *     summary: Get workout templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout templates fetched successfully
 */
router.get('/templates', authenticate, workoutController.listTemplates);

/**
 * @openapi
 * /workout/custom:
 *   post:
 *     tags: [Workout]
 *     summary: Create a custom workout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               targetMuscles:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               gifUrl:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Custom workout created successfully
 */
router.post('/custom', authenticate, workoutController.createCustomWorkout);

/**
 * @openapi
 * /workout/custom:
 *   get:
 *     tags: [Workout]
 *     summary: Get custom workouts for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Custom workouts fetched successfully
 */
router.get('/custom', authenticate, workoutController.listCustomWorkouts);

/**
 * @openapi
 * /workout/sessions:
 *   post:
 *     tags: [Workout]
 *     summary: Create a workout session
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [workoutType, workoutId, actualDate]
 *             properties:
 *               planId:
 *                 type: string
 *               workoutType:
 *                 type: string
 *                 enum: [template, custom]
 *               workoutId:
 *                 type: string
 *               actualDate:
 *                 type: string
 *                 format: date-time
 *               scheduledDayOfWeek:
 *                 type: string
 *                 enum: [mon, tue, wed, thu, fri, sat, sun]
 *               status:
 *                 type: string
 *                 enum: [planned, in_progress, completed]
 *               notes:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     sets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reps:
 *                             type: number
 *                           weight:
 *                             type: number
 *                           completed:
 *                             type: boolean
 *     responses:
 *       201:
 *         description: Workout session created successfully
 */
router.post('/sessions', authenticate, workoutController.createSession);

/**
 * @openapi
 * /workout/sessions:
 *   get:
 *     tags: [Workout]
 *     summary: Get workout sessions for the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout sessions fetched successfully
 */
router.get('/sessions', authenticate, workoutController.listSessions);

/**
 * @openapi
 * /workout/sessions/{id}:
 *   get:
 *     tags: [Workout]
 *     summary: Get one workout session by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout session fetched successfully
 */
router.get('/sessions/:id', authenticate, workoutController.getSessionById);

/**
 * @openapi
 * /workout/sessions/{id}:
 *   put:
 *     tags: [Workout]
 *     summary: Update a workout session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actualDate:
 *                 type: string
 *                 format: date-time
 *               scheduledDayOfWeek:
 *                 type: string
 *                 enum: [mon, tue, wed, thu, fri, sat, sun]
 *               status:
 *                 type: string
 *                 enum: [planned, in_progress, completed]
 *               notes:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     sets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reps:
 *                             type: number
 *                           weight:
 *                             type: number
 *                           completed:
 *                             type: boolean
 *     responses:
 *       200:
 *         description: Workout session updated successfully
 */
router.put('/sessions/:id', authenticate, workoutController.updateSession);

/**
 * @openapi
 * /workout/sessions/{id}:
 *   delete:
 *     tags: [Workout]
 *     summary: Delete a workout session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout session deleted successfully
 */
router.delete('/sessions/:id', authenticate, workoutController.deleteSession);

/**
 * @openapi
 * /workout/sessions/{id}/log:
 *   post:
 *     tags: [Workout]
 *     summary: Log sets, reps, and weight for a session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [exercises]
 *             properties:
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     sets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reps:
 *                             type: number
 *                           weight:
 *                             type: number
 *                           completed:
 *                             type: boolean
 *     responses:
 *       200:
 *         description: Session logging updated successfully
 */
router.post('/sessions/:id/log', authenticate, workoutController.logSessionExercise);

export default router;