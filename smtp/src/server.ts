import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import apiRoute from './api/index';
import { INTERNAL_ERROR, NOT_FOUND } from './lib/constant';
import nocache from 'nocache';
import cors from 'cors';
import timeout from 'connect-timeout';
import { errorLog } from './lib/log';

const app = express();

app.use(cors());
app.use(nocache());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('date', () => {
  const p = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, '+')
    .split(/ /);
  return p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5];
});
app.use(morgan('common'));

// if (NODE_ENV === 'production') {
//   app.use(helmet());
// }

app.use(timeout('5s'));

app.use('/api', apiRoute);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorLog(err);

  res.status(INTERNAL_ERROR).json({
    error: err.message,
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(NOT_FOUND).json({ error: 'invalid request' });
});

export default app;
