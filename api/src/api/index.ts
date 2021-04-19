import { Router } from 'express';
import multer from 'multer';
import bytes from 'bytes';
import { FILE_MAX_COUNT, FILE_MAX_SIZE } from '../lib/config';
import { errorHandler } from '../lib/common';
import nonAuthRoute from './non.auth';
import authRoute from './auth';
import mailAuthRoute from './mail.auth';
import mallRoute from './mall';
import menuRoute from './menu';
import reviewRoute from './review';
import { authentication, getUserType } from '../middleware/user.middleware';
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
router.use(errorHandler(authentication));
router.use(errorHandler(getUserType));

// authRouters
router.use('/auth', authRoute);
router.use('/mail-auth', mailAuthRoute);
router.use('/mall', mallRoute);
router.use('/menu', menuRoute);
router.use('/review', reviewRoute);

export default router;
