import { Request, Response, Router } from 'express';
import { isArray } from 'lodash';
import { fileUploadReturnUrl } from '../controller/file.controller';
import { getMallById } from '../controller/mall.controller';
import {
  deleteReview,
  enrollReview,
  getReviewById,
  getReviewListByMallId,
} from '../controller/review.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { reviewAttributes } from '../models/review';
import { user } from '../models/user';
import { user_role } from '../models/user_role';
import { user_role_group } from '../models/user_role_group';

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
 *        description: 현재 페이지 마지막 인덱스
 *      - in: query
 *        type: string
 *        required: true
 *        name: myReview
 *        description: 내 리뷰목록 조회여부 Y | N
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
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;
    const myReview = <string>req.query.myReview;

    if (!mall_id || !myReview) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    if (!['Y', 'N'].includes(myReview)) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'invalid myReview parameter' });
    }

    const theMall = await getMallById(mall_id);
    if (typeof theMall == 'string') {
      return theMall;
    }

    const reviewList = await getReviewListByMallId(
      mall_id,
      cursor,
      myReview == 'Y' ? req.body._user_id : null
    );
    res.status(OK).json(reviewList);
  })
);

/**
 * @swagger
 * /api/review/{review_id}:
 *  delete:
 *    tags: [리뷰]
 *    summary: 리뷰 삭제
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: review_id
 *        description: 리뷰 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.delete(
  '/:review_id',
  errorHandler(async (req: Request, res: Response) => {
    const review_id = Number(req.params.review_id);
    if (!review_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theReview = await getReviewById(review_id);
    if (typeof theReview == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theReview });
    }

    const theUserRole:
      | null
      | (user_role & {
          user_role_group?: user_role_group;
        }) = await user_role.findOne({
      where: {
        user_id: req.body._user_id,
      },
      include: [
        {
          association: 'user_role_group',
        },
      ],
    });
    if (!theUserRole || !theUserRole.user_role_group) {
      return res.status(INTERNAL_ERROR).json({ error: `get user's role fail` });
    }
    if (
      theUserRole.user_role_group.name != 'ADMIN' &&
      theReview.user_id != req.body._user_id
    ) {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: 'not have delete permission to the review' });
    }

    const deleteResult = await deleteReview(theReview);
    if (deleteResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: deleteResult });
    }

    res.status(OK).json({ result: 'success' });
  })
);

export default router;
