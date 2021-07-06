import { Request, Response, Router } from 'express';
import {
  enrollDashboard,
  getDashboardByDateInfo,
  getDashboardByRange,
} from '../controller/dashboard.controller';
import { errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { dashboardDayToDay } from '../lib/type';
import { dashboardAttributes } from '../models/dashboard';
import { mall } from '../models/mall';
import { report } from '../models/report';
import { review } from '../models/review';
import { suggestion } from '../models/suggestion';
import { user } from '../models/user';

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *  post:
 *    tags: [대시보드]
 *    summary: 대시보드 갱신
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
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const todayDashboard = await getDashboardByDateInfo(year, month, date);
    if (typeof todayDashboard != 'string') {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: 'today dashboard info already enrolled' });
    }

    const report_count = (
      await report.findAll({
        attributes: {
          include: [],
        },
      })
    ).length;

    const suggestion_count = (
      await suggestion.findAll({
        attributes: {
          include: [],
        },
      })
    ).length;

    const mall_count = (
      await mall.findAll({
        where: {
          is_active: 'Y',
        },
        attributes: {
          include: [],
        },
      })
    ).length;

    const review_count = (
      await review.findAll({
        where: {
          is_active: 'Y',
        },
        attributes: {
          include: [],
        },
      })
    ).length;

    const user_count = (
      await user.findAll({
        where: {
          is_active: 'Y',
        },
        attributes: {
          include: [],
        },
      })
    ).length;

    const dashboardModel: dashboardAttributes = {
      year,
      month,
      date,
      report_count,
      suggestion_count,
      mall_count,
      review_count,
      user_count,
    };

    const enrolledTodayDashboard = await enrollDashboard(dashboardModel);
    if (typeof enrolledTodayDashboard == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledTodayDashboard });
    }
    res.status(OK).json(enrolledTodayDashboard);
  })
);

/**
 * @swagger
 * /api/dashboard:
 *  get:
 *    tags: [대시보드]
 *    summary: 대시보드 조회
 *    parameters:
 *      - in: query
 *        type: number
 *        required: false
 *        name: range
 *        default: 1
 *        description: 조회 일 범위(최근 기준, 1~7일)
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
    const range = Number(req.query.range) || 1;
    if (range < 1 || range > 7) {
      return res.status(BAD_REQUEST).json({ error: 'out of range' });
    }

    const recentDashboardList = await getDashboardByRange(range);
    const parsedDashboardList: dashboardDayToDay[] = [];
    // using map() -> invalid result
    // try reduce()
    for (let i = 0; i < recentDashboardList.length - 1; i++) {
      parsedDashboardList.push({
        ...recentDashboardList[i].get({ plain: true }),
        dtd_report:
          recentDashboardList[i].report_count! -
          recentDashboardList[i + 1].report_count!,
        dtd_suggestion:
          recentDashboardList[i].suggestion_count! -
          recentDashboardList[i + 1].suggestion_count!,
        dtd_mall:
          recentDashboardList[i].mall_count! -
          recentDashboardList[i + 1].mall_count!,
        dtd_review:
          recentDashboardList[i].review_count! -
          recentDashboardList[i + 1].review_count!,
        dtd_user:
          recentDashboardList[i].user_count! -
          recentDashboardList[i + 1].user_count!,
      });
    }

    res.status(OK).json(parsedDashboardList);
  })
);

export default router;
