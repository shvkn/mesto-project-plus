import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorMessages, ErrorNames } from '../shared/constants';
import AuthError from '../shared/auth-error';
import ForbiddenError from '../shared/forbidden-error';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const { name = ErrorNames.UNKNOWN_ERR } = err;
  let { message = ErrorMessages.DEFAULT } = err;
  if (name === ErrorNames.NOT_FOUND_ERR) {
    res.status(StatusCodes.NOT_FOUND);
  } else if (name === ErrorNames.VALIDATION_ERR || name === ErrorNames.CAST_ERROR) {
    res.status(StatusCodes.BAD_REQUEST);
  } else if (err instanceof AuthError) {
    message = message.length > 0 ? message : ErrorMessages.AUTH_ERROR;
    res.status(StatusCodes.UNAUTHORIZED);
  } else if (err instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN);
  } else {
    message = ErrorMessages.DEFAULT;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  res.send({ message });
};

export default errorMiddleware;
