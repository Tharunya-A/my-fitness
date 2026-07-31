export class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(message = 'Username or email already exists') {
    super(message, 409);
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid username or password') {
    super(message, 401);
  }
}

export class UserNotFoundError extends AuthError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

