import type {Express, NextFunction, Request, Response} from 'express';
import {ValidateError} from 'tsoa';

import messages from '../server/messages';
import {sendError} from '../server/responses';

export default function handleErrors(app: Express) {
  app.use(function notFoundHandler(_req, res: Response) {
    sendError(res, {
      code: messages.NOT_FOUND.statusCode,
      message: 'Not Found',
    });
  });

  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    if (err instanceof ValidateError) {
      err['code'] = messages.INCOMPLETE_REQUEST.statusCode;
      err.message ||= 'Invalid object in the payload';
      return sendError(res, err);
    }
    if (err instanceof Error) {
      return sendError(res, err);
    }

    next();
  });
}
