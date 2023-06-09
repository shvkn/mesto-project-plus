import { StatusCodes } from 'http-status-codes';

class AuthError extends Error {
  statusCode: StatusCodes;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthError;
