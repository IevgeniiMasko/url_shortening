import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error(err);
  response.status(500).send('Something went wrong');
};
