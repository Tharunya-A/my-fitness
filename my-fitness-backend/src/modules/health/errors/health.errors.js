export class HealthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class HealthRecordNotFoundError extends HealthError {
  constructor(message = 'Health record not found') {
    super(message, 404);
  }
}

export class UnauthorizedHealthAccessError extends HealthError {
  constructor(message = 'You do not have permission to access this health record') {
    super(message, 403);
  }
}

export class FileUploadError extends HealthError {
  constructor(message = 'Failed to upload file') {
    super(message, 400);
  }
}