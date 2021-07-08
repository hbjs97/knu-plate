import { Request, Response, Router } from 'express';
import {
  enrollReport,
  getReportById,
  getReportList,
  getReportStatus,
  updateReportByModel,
} from '../controller/report.controller';
import {
  getReviewById,
  updateReviewByModel,
} from '../controller/review.controller';
import { getUserById, setUserByModel } from '../controller/user.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  REPORT_PROCESS,
} from '../lib/constant';
import { DB } from '../lib/sequelize';
import {
  authentication,
  getUserRole,
  getUserType,
  hasUserAccessRouter,
} from '../middleware/user.middleware';
import { report, reportAttributes } from '../models/report';
import { review } from '../models/review';
import { user } from '../models/user';

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
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
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
 *        name: category
 *        description: 특정 카테고리 조회 ['proceeding', 'sanctioned', 'passed']
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
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;
    const category = <string>req.query.category;

    if (category && !REPORT_PROCESS.includes(category)) {
      return res.status(BAD_REQUEST).json({ error: 'invalid report process' });
    }

    const reportList = await getReportList(cursor, category);
    const result = reportList.map((v) => {
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
 * /api/report:
 *  get:
 *    tags: [신고]
 *    summary: 신고 현황 조회
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/status',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    const reportStatus = await getReportStatus();
    res.status(OK).json(reportStatus);
  })
);

/**
 * @swagger
 * /api/report/{report_id}:
 *  get:
 *    tags: [신고]
 *    summary: 신고 상세 조회
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: report_id
 *        description: 신고 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/:report_id',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    const report_id = Number(req.params.report_id);
    if (!report_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theReport:
      | null
      | (report & { user?: user; review?: review }) = await report.findOne({
      where: {
        report_id,
      },
      include: [
        {
          association: 'user',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          association: 'review',
          include: [
            {
              association: 'user',
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
      ],
    });
    if (!theReport) {
      return res.status(INTERNAL_ERROR).json({ error: 'report not founded' });
    }
    res.status(OK).json({
      ...theReport.get({ plain: true }),
      date_create: changeModelTimestamp(theReport.date_create!),
      review: {
        ...theReport.review?.get({ plain: true }),
        date_create: changeModelTimestamp(theReport.review?.date_create!),
      },
    });
  })
);

/**
 * @swagger
 * /api/report/{report_id}:
 *  patch:
 *    tags: [신고]
 *    summary: 신고 처리
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: report_id
 *        description: 신고 아이디
 *      - in: formData
 *        type: string
 *        required: true
 *        name: result
 *        description: 처리 결과 ['sanctioned', 'passed']
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.patch(
  '/:report_id',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    const report_id = Number(req.params.report_id);
    const result = req.body.result;

    if (!report_id || !result) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }
    if (!REPORT_PROCESS.includes(result)) {
      return res.status(BAD_REQUEST).json({ error: 'invalid report result' });
    }

    const theReport = await getReportById(report_id);
    if (typeof theReport == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theReport });
    }
    if (theReport.result != REPORT_PROCESS[0]) {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: 'already processed report' });
    }

    const theReview = await getReviewById(theReport.review_id!);
    if (typeof theReview == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theReview });
    }

    const theUser = await getUserById(theReview.user_id!);
    if (typeof theUser == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theUser });
    }

    try {
      await DB.transaction(async (transaction) => {
        if (result == REPORT_PROCESS[1]) {
          const updatedUser = await setUserByModel(
            theUser,
            {
              ...theUser.get({ plain: true }),
              is_active: 'N',
            },
            transaction
          );
          if (typeof updatedUser == 'string') {
            throw new Error(updatedUser);
          }
          if (updatedUser.is_active != 'N') {
            throw new Error('user inactivate fail');
          }

          const updatedReview = await updateReviewByModel(
            {
              ...theReview.get({ plain: true }),
              is_active: 'N',
            },
            transaction
          );
          if (typeof updatedReview == 'string') {
            throw new Error(updatedReview);
          }
        }

        const updatedReport = await updateReportByModel(
          {
            ...theReport.get({ plain: true }),
            result: result,
          },
          transaction
        );
        if (typeof updatedReport == 'string') {
          throw new Error(updatedReport);
        }
        if (updatedReport.result != result) {
          throw new Error('report result update fail');
        }
      });
      res.status(OK).json({ result: 'success' });
    } catch (error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    }
  })
);

export default router;
