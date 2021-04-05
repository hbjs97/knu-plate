import { Request, Response, Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUserByName,
  loginProcess,
  logoutProcess,
} from '../controller/user.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { user, userAttributes } from '../models/user';

const router = Router();

/**
 * @swagger
 * /api/auth:
 *  get:
 *    tags: [회원]
 *    summary: 조회
 *    security:
 *      - access: []
 *    parameters:
 *      - in: query
 *        type: string
 *        required: false
 *        name: name
 *        description: 이름으로 조회, 공백일 때 본인 정보 조회.
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      404:
 *        description: not found
 */
router.get(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    let userName = <string>req.query.name;
    if (!userName) {
      const theUser = await user.findOne({
        where: { user_id: req.body._user_id, is_active: 'Y' },
      });
      if (!theUser) {
        return res.status(BAD_REQUEST).json({ error: 'user not founded' });
      }
      userName = <string>theUser.user_name;
    }

    const theUser = await getUserByName(userName);
    if (typeof theUser == 'string') {
      return res.status(BAD_REQUEST).json({ error: 'user not founded' });
    }
    const result = theUser.get({ plain: true });
    delete result.password;

    res.status(OK).json({
      ...result,
      date_create: changeModelTimestamp(result.date_create!),
    });
  })
);

/**
 * @swagger
 * /api/auth/signout:
 *  delete:
 *    tags: [회원]
 *    summary: 회원탈퇴
 *    security:
 *      - access: []
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.delete('/signout', async (req: Request, res: Response) => {
  // if (!req.body._token_id) {
  //   return res.status(BAD_REQUEST).json({ error: 'refresh token is empty' });
  // }

  const result = await deleteUser(req.body._user_id);

  if (result != 'ok') {
    return res.status(INTERNAL_ERROR).json({ error: result });
  }

  res.status(OK).json({ success: 'inactive' });
});

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    tags: [회원]
 *    summary: 로그아웃
 *    security:
 *      - access: []
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.post(
  '/logout',
  errorHandler(async (req: Request, res: Response) => {
    const result = await logoutProcess(req.body._user_id);
    if (result != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: result });
    }
    res.status(OK).json({ success: 'logout success' });
  })
);

/**
 * @swagger
 * /api/auth/refresh:
 *  post:
 *    tags: [회원]
 *    summary: 토큰 갱신
 *    security:
 *      - refresh: []
 *    responses:
 *      200:
 *        description: success
 */
router.post(
  '/refresh',
  errorHandler(async (req: Request, res: Response) => {
    const theUser = await getUserById(req.body._user_id);
    if (typeof theUser == 'string') {
      return res.status(BAD_REQUEST).json({ error: 'not found user' });
    }

    const logoutResult = await logoutProcess(req.body._user_id);
    if (logoutResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: 'logout fail' });
    }

    const userAgent = req.get('User-Agent');
    const token = await loginProcess(theUser, userAgent);
    if (typeof token == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: token });
    }
    res.status(OK).json(token);
  })
);

export default router;
