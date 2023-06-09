import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

class ForbiddenError extends HttpError {
  statusCode: StatusCodes;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
