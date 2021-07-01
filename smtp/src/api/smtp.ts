import { Request, Response, Router } from 'express';
import { sendMail } from '../controller/mail.controller';
import { errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';

const router = Router();

router.post(
  '/send-mail',
  errorHandler(async (req: Request, res: Response) => {
    const targetMailAddress = req.body.targetMailAddress;
    const mailContents = req.body.mailContents;
    if (!targetMailAddress) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'targetMailAddress is empty' });
    }
    if (!mailContents) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'mailContents is empty' });
    }

    const sendMailResult = await sendMail(
      targetMailAddress,
      mailContents
    );
    if (sendMailResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: sendMailResult });
    }

    res.status(OK).json({ result: 'success' });
  })
);

export default router;
