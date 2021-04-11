import { MAILID, MAILPASSWORD, MAILSERVICE } from './config';

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const PAYLOAD_TOO_LARGE = 413;

export const OK = 200;

export const INTERNAL_ERROR = 500;

export const MAIL_INFO = {
  mailid: MAILID,
  mailpassword: MAILPASSWORD,
  mailservice: MAILSERVICE,
};

export const MAIL_SUBJECT = 'knu-plate authentication url';
