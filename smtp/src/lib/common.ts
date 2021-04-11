import { NextFunction, Request, Response } from 'express';

export function errorHandler(cb: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    cb(req, res, next).catch(next);
  };
}