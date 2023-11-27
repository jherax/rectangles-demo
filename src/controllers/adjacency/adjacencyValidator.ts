import type {NextFunction, Request, Response} from 'express';

export default function adjacencyValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // TODO: Add request validations
  next();
}
