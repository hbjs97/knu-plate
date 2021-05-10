import { Request, Response, Router } from 'express';
import { isArray } from 'lodash';
import { fileUploadReturnUrl } from '../controller/file.controller';
import {
  enrollReview,
  getReviewListByMallId,
} from '../controller/review.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { reviewAttributes } from '../models/review';

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

    const reviewModel: reviewAttributes = {
      mall_id,
      contents,
      evaluate,
      user_id: req.body._user_id,
    };

    try {
      const result = await DB.transaction(async (transaction) => {
        if (req.files && !isArray(req.files) && req.files.review_image) {
          const url = await fileUploadReturnUrl(
            req.body._user_id,
            req.files.review_image,
            transaction
          );
          if (typeof url != 'string') {
            reviewModel.review_image = url.file_folder_id;
          }
        }

        const enrolledReview = await enrollReview(
          reviewModel,
          menu_info,
          transaction
        );
        if (typeof enrolledReview == 'string') {
          throw new Error(enrolledReview);
        }
        return enrolledReview;
      });
      res.status(OK).json({
        ...result.get({ plain: true }),
        date_create: changeModelTimestamp(result.date_create!),
      });
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ error: error.message });
    }
  })
);

/**
 * @swagger
 * /api/review:
 *  get:
 *    tags: [리뷰]
 *    summary: 리뷰 조회
 *    parameters:
 *      - in: query
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *      - in: query
 *        type: number
 *        required: false
 *        name: cursor
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
    const cursor = Number(req.query.cursor) || 0;
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const reviewList = await getReviewListByMallId(mall_id, cursor);
    if (typeof reviewList == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: reviewList });
    }
    res.status(OK).json(reviewList);
  })
);

export default router;
