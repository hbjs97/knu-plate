import { isNumber } from 'lodash';

export const JWT_SALT = process.env.JWT_SALT || 'secret';
export const JWT_EXPIRE_ACCESS = process.env.JWT_EXPIRE_ACCESS || '30m';
export const JWT_EXPIRE_REFRESH = process.env.JWT_EXPIRE_REFRESH || '7d';

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'test2';
export const MYSQL_USER = process.env.MYSQL_USER || 'test';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'test';
export const DB_URL = process.env.DB_URL || 'db-maria';

export const PASSWORD_SALT = process.env.PASSWORD_SALT || 'oh my gosh';
export const DEV_FILE_SERVER_URL =
  process.env.DEV_FILE_SERVER_URL || 'http://localhost:4200/';
export const FILE_MAX_SIZE = process.env.FILE_MAX_SIZE || '50mb';
export const FILE_MAX_COUNT = Number(process.env.FILE_MAX_COUNT) || 10;
export const PORT = Number(process.env.PORT) || 4100;

if (!isNumber(PORT)) {
  throw new Error('PORT is invalid');
}

export const KAKAOAK = process.env.KAKAOAK || '';

export const CRON_AUTH_KEY = process.env.CRON_AUTH_KEY || '';
