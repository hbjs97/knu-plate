import { Router } from 'express';
import multer from 'multer';
import bytes from 'bytes';
import { FILE_MAX_COUNT, FILE_MAX_SIZE } from '../lib/config';
import nonAuthRoute from './non.auth';
import authRoute from './auth';
import mailAuthRoute from './mail.auth';
import mallRoute from './mall';
import menuRoute from './menu';
import reviewRoute from './review';
import fileRoute from './file';
import suggestionRoute from './suggestion';
import reportRoute from './report';
import noticeRoute from './notice';
import dashboardRoute from './dashboard';
import { uploadFileType } from '../lib/constant';
import { keys } from 'lodash';

const router = Router();

const upload = multer({
  limits: {
    fileSize: bytes(FILE_MAX_SIZE),
  },
});

const uploadFileTypeNames = keys(uploadFileType);
router.use(
  upload.fields(
    uploadFileTypeNames.map((name) => ({
      name,
      maxCount: FILE_MAX_COUNT,
    }))
  )
);

// nonAuthRouters
router.use('/', nonAuthRoute);

// middleware

// authRouters
router.use('/auth', authRoute);
router.use('/mail-auth', mailAuthRoute);
router.use('/mall', mallRoute);
router.use('/menu', menuRoute);
router.use('/review', reviewRoute);
router.use('/file', fileRoute);
router.use('/suggestion', suggestionRoute);
router.use('/report', reportRoute);
router.use('/notice', noticeRoute);
router.use('/dashboard', dashboardRoute);

export default router;
