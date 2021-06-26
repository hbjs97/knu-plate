import { Request, Response, Router } from 'express';
import { enrollNotice, getNoticeList } from '../controller/notice.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { notice, noticeAttributes } from '../models/notice';

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

/**
 * @swagger
 * /api/notice:
 *  get:
 *    tags: [공지]
 *    summary: 공지 목록 조회
 *    parameters:
 *      - in: query
 *        type: number
 *        required: false
 *        name: cursor
 *        description: 현재 페이지 마지막 인덱스
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;
    const noticeList = await getNoticeList(cursor);
    const result = noticeList.map((v) => {
      return {
        ...v.get({ plain: true }),
        date_create: changeModelTimestamp(v.date_create!),
      };
    });
    res.status(OK).json(result);
  })
);

/**
 * @swagger
 * /api/notice/{notice_id}:
 *  get:
 *    tags: [공지]
 *    summary: 공지 상세 조회
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: notice_id
 *        description: 공지 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/:notice_id',
  errorHandler(async (req: Request, res: Response) => {
    const notice_id = Number(req.params.notice_id);
    if (!notice_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theNotice = await notice.findOne({
      where: {
        notice_id,
      },
      include: [
        {
          association: 'user',
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              association: 'file_folder',
              include: [
                {
                  association: 'files',
                },
              ],
            },
          ],
        },
      ],
    });
    if (!theNotice) {
      return res.status(INTERNAL_ERROR).json({ error: 'notice not founded' });
    }
    if (theNotice.is_active != 'Y') {
      return res.status(INTERNAL_ERROR).json({ error: 'inactive notice' });
    }

    res.status(OK).json({
      ...theNotice.get({ plain: true }),
    });
  })
);

export default router;
