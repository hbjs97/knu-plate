import {
  DB_URL,
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_USER,
  NODE_ENV,
} from './config';
import sequelize, { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models';

let selectedDB: {
  db?: string;
  user?: string;
  pass?: string;
  option: sequelize.Options & {
    dialect: string;
    timezone: string;
    dialectOptions: {
      timezone: string;
    };
    host?: string;
  };
} = {
  option: {
    dialect: <'mariadb'>'mariadb',
    timezone: 'Asia/Seoul',
    dialectOptions: {
      timezone: 'Etc/GMT+9',
    },
  },
};

if (NODE_ENV === 'test') {
  selectedDB = {
    db: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASSWORD,
    option: {
      ...selectedDB.option,
      host: '127.0.0.1',
    },
  };
} else {
  selectedDB = {
    db: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASSWORD,
    option: {
      ...selectedDB.option,
      host: DB_URL,
    },
  };
}

export const DBConfig = selectedDB;

const myDB = new Sequelize(
  DBConfig.db!,
  DBConfig.user!,
  DBConfig.pass,
  DBConfig.option
);

initModels(myDB);

export const DB = myDB;
export const Op = sequelize.Op;
