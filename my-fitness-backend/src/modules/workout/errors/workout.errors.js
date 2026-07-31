export class WorkoutError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class WorkoutNotFoundError extends WorkoutError {
  constructor(message = 'Workout record not found') {
    super(message, 404);
  }
}

export class InvalidWorkoutPlanError extends WorkoutError {
  constructor(message = 'Invalid workout plan') {
    super(message, 400);
  }
}

export class UnauthorizedWorkoutAccessError extends WorkoutError {
  constructor(message = 'You do not have access to this workout resource') {
    super(message, 403);
  }
}