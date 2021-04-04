import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { PASSWORD_SALT } from './config';

export function errorHandler(cb: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    cb(req, res, next).catch(next);
  };
}

export function regexTestDecoded(regex: RegExp, s: string): boolean {
  return regex.test(decodeURIComponent(s));
}

export function encrypt_password(password: string): string {
  const salt = Buffer.from(PASSWORD_SALT).toString('base64');
  const key = crypto.pbkdf2Sync(password, salt, 151906, 64, 'sha512');
  return key.toString('base64');
}

export function changeModelTimestamp(time: Date | number): number | string {
  try {
    return +new Date(time);
  } catch (error) {
    throw new Error('timestamp type is invalid');
  }
}
