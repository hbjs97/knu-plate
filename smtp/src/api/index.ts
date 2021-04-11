import { Router } from 'express';
import smtpRoute from './smtp';

const router = Router();

router.use('/', smtpRoute);

export default router;
