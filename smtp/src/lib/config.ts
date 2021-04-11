import { isNumber } from 'lodash';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.SMTP_PORT) || 4300;

if (!isNumber(PORT)) {
  throw new Error('PORT is invalid');
}

export const DEV_SMTP_SERVER = process.env.DEV_SMTP_SERVER || '';

if (!DEV_SMTP_SERVER) {
  throw new Error('SMTP SERVER url empty');
}

export const MAILID = process.env.MAILID || '';
export const MAILPASSWORD = process.env.MAILPASSWORD || '';
export const MAILSERVICE = process.env.MAILSERVICE || '';

if (!MAILID || !MAILPASSWORD || !MAILSERVICE) {
  throw new Error('MAILINFO are empty');
}
