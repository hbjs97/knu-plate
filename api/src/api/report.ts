import { Request, Response, Router } from 'express';
import { enrollReport } from '../controller/report.controller';
import { getReviewById } from '../controller/review.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  REPORT_PROCESS,
} from '../lib/constant';
import { reportAttributes } from '../models/report';

const router = Router();

/**
 * @swagger
 * /api/report:
 *  post:
 *    tags: [신고]
 *    summary: 신고 등록
 *    parameters:
 *      - in: formData
 *        type: number
 *        required: true
 *        name: review_id
 *        description: 리뷰 아이디
 *      - in: formData
 *        type: reason
 *        required: true
 *        name: reason
 *        description: 신고 사유
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
    const review_id = Number(req.body.review_id);
    const reason = req.body.reason;
    if (!review_id || !reason) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theReview = await getReviewById(review_id);
    if (typeof theReview == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theReview });
    }

    const reportModel: reportAttributes = {
      user_id: req.body._user_id,
      review_id,
      reason,
      result: REPORT_PROCESS[0],
    };

    const enrolledReport = await enrollReport(reportModel);
    if (typeof enrolledReport == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledReport });
    }
    res.status(OK).json({
      ...enrolledReport.get({ plain: true }),
      date_create: changeModelTimestamp(enrolledReport.date_create!),
    });
  })
);

/**
 * @swagger
 * /api/report:
 *  get:
 *    tags: [신고]
 *    summary: 신고 목록 조회
 *    parameters:
 *      - in: query
 *        type: number
 *        required: false
 *        name: result
 *        description: 처리 결과
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
  })
);

export default router;
