import { Request, Response, Router } from 'express';
import { enrollNotice } from '../controller/notice.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { noticeAttributes } from '../models/notice';

const router = Router();

/**
 * @swagger
 * /api/notice:
 *  post:
 *    tags: [공지]
 *    summary: 공지 등록
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: title
 *        description: 제목
 *      - in: formData
 *        type: text
 *        required: true
 *        name: contents
 *        description: 내용
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.post(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const title = req.body.title;
    const contents = req.body.contents;
    if (!title || !contents) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const noticeModel: noticeAttributes = {
      user_id: req.body._user_id,
      title,
      contents,
    };

    const enrolledNotice = await enrollNotice(noticeModel);
    if (typeof enrolledNotice == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledNotice });
    }

    res.status(OK).json({
      ...enrolledNotice.get({ plain: true }),
      date_create: changeModelTimestamp(enrolledNotice.date_create!),
    });
  })
);

export default router;
