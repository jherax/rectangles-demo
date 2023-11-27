import type {NextFunction, Request, Response} from 'express';

export default function intersectionValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // TODO: Add request validations
  next();
}
