import { Request, Response, Router } from 'express';
import {
  sendAuthMailByUserId,
  userMailCodeAuthentication,
} from '../controller/mail.auth.controller';
import { getUserRoleByUserID } from '../controller/user.role.controller';
import { errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';

const router = Router();
/**
 * @swagger
 * /api/mail-auth/issuance:
 *  post:
 *    tags: [회원 - 인증]
 *    summary: 인증코드 발급
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      404:
 *        description: not found
 *      500:
 *        description: internal error
 */
router.post(
  '/issuance',
  errorHandler(async (req: Request, res: Response) => {
    const userRole = await getUserRoleByUserID(req.body._user_id);
    if (userRole == 'not founded') {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: 'user_role not founded' });
    }
    if (userRole != 'NON_AUTH_USER') {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: 'you are not non-auth user' });
    }

    const sendMailResult = await sendAuthMailByUserId(req.body._user_id);
    if (sendMailResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: sendMailResult });
    }

    res.status(OK).json({ result: 'success' });
  })
);

/**
 * @swagger
 * /api/mail-auth/verification:
 *  patch:
 *    tags: [회원 - 인증]
 *    summary: 메일 인증
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: auth_code
 *        description: 인증 코드
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      404:
 *        description: not found
 *      500:
 *        description: internal error
 */
router.patch(
  '/verification',
  errorHandler(async (req: Request, res: Response) => {
    const authCode = req.body.auth_code;
    if (!authCode) {
      return res.status(BAD_REQUEST).json({ error: 'auth_code is empty' });
    }
    const authenticationResult = await userMailCodeAuthentication(
      req.body._user_id,
      authCode
    );
    if (authenticationResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: authenticationResult });
    }
    res.status(OK).json({ result: 'success' });
  })
);

export default router;
