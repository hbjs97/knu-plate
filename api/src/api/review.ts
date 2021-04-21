import { Request, Response, Router } from 'express';
import {
  enrollReview,
  getReviewListByMallId,
} from '../controller/review.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';

const router = Router();

/**
 * @swagger
 * /api/review:
 *  post:
 *    tags: [리뷰]
 *    summary: 리뷰 등록
 *    parameters:
 *      - in: formData
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *      - in: formData
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            is_like:
 *              type: string
 *        required: false
 *        name: menu_info
 *        description: menu_id \number\ is_like \Y | N\
 *      - in: formData
 *        type: string
 *        required: true
 *        name: contents
 *        description: 리뷰 내용
 *      - in: formData
 *        type: number
 *        required: true
 *        name: evaluate
 *        description: 평점
 *      - in: formData
 *        type: file
 *        required: false
 *        name: review_image
 *        description: 리뷰 이미지
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
    const mall_id = req.body.mall_id;
    const menu_info = JSON.parse(req.body.menu_info);
    const contents = req.body.contents;
    const evaluate = req.body.evaluate;

    if (!mall_id || !menu_info || !contents || !evaluate) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    menu_info.some((v: { menu_id: number; is_like: string }) => {
      if (!['Y', 'N'].includes(v.is_like)) {
        return res
          .status(BAD_REQUEST)
          .json({ error: 'is_like is only Y or N' });
      }
    });

    const enrolledReview = await enrollReview(
      {
        mall_id,
        contents,
        evaluate,
        user_id: req.body._user_id,
      },
      menu_info
    );
    if (typeof enrolledReview == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledReview });
    }
    res.status(OK).json({
      ...enrolledReview.get({ plain: true }),
      date_create: changeModelTimestamp(enrolledReview.date_create!),
    });
  })
);

/**
 * @swagger
 * /api/review:
 *  get:
 *    tags: [리뷰]
 *    summary: 리뷰 등록
 *    parameters:
 *      - in: query
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *      - in: query
 *        type: number
 *        required: false
 *        name: page
 *        description: 페이지 인덱스
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
    const mall_id = Number(req.query.mall_id);
    const pageNumber = Number(req.query.page) || 0;
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const reviewList = await getReviewListByMallId(mall_id, pageNumber);
    if (typeof reviewList == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: reviewList });
    }
    res.status(OK).json(reviewList);
  })
);

export default router;
