import { Request, Response, Router } from 'express';
import {
  enrollSuggestion,
  getSuggestionList,
} from '../controller/suggestion.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { suggestion, suggestionAttributes } from '../models/suggestion';
import { user } from '../models/user';

const router = Router();

/**
 * @swagger
 * /api/suggestion:
 *  post:
 *    tags: [건의사항]
 *    summary: 건의사항 등록
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: title
 *        description: 건의사항 제목
 *      - in: formData
 *        type: text
 *        required: true
 *        name: contents
 *        description: 건의사항 내용
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

    const suggestionModel: suggestionAttributes = {
      title,
      contents,
      user_id: req.body._user_id,
    };

    const enrolledSuggestion = await enrollSuggestion(suggestionModel);
    if (typeof enrolledSuggestion == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledSuggestion });
    }
    res.status(OK).json({
      ...enrolledSuggestion.get({ plain: true }),
      date_create: changeModelTimestamp(enrolledSuggestion.date_create!),
    });
  })
);

/**
 * @swagger
 * /api/suggestion:
 *  get:
 *    tags: [건의사항]
 *    summary: 건의사항 목록 조회
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
    const suggestionList = await getSuggestionList(cursor);
    const result = suggestionList.map((v) => {
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
 * /api/suggestion/{suggestion_id}:
 *  get:
 *    tags: [건의사항]
 *    summary: 건의사항 상세 조회
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: suggestion_id
 *        description: 건의사항 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/:suggestion_id',
  errorHandler(async (req: Request, res: Response) => {
    const suggestion_id = Number(req.params.suggestion_id);
    if (!suggestion_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theSuggestion:
      | null
      | (suggestion & { user?: user }) = await suggestion.findOne({
      where: {
        suggestion_id,
      },
      include: [
        {
          association: 'user',
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    if (!theSuggestion) {
      return res.status(BAD_REQUEST).json({ error: 'suggestion not founded' });
    }
    res.status(OK).json({
      ...theSuggestion.get({ plain: true }),
      date_create: changeModelTimestamp(theSuggestion.date_create!),
      user: {
        ...theSuggestion.user?.get({ plain: true }),
        date_create: changeModelTimestamp(theSuggestion.user?.date_create!),
      },
    });
  })
);

export default router;
