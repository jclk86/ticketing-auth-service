import { CustomError } from './custom-errors';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

// need serialize error and status code method so that errorhandler doesn't need to grow for every different error condition
