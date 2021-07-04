import { Request, Response, Router } from 'express';
import { includes, isArray } from 'lodash';
import {
  fileUploadReturnUrl,
  getFileFolderById,
  getFileListFromFileFolder,
} from '../controller/file.controller';
import { deleteFileFolderDevelop } from '../controller/file.develop.controller';
import {
  deleteUser,
  getUserByDisplayName,
  getUserById,
  getUserByIdExceptPassword,
  getUserByName,
  loginProcess,
  logoutProcess,
  setUserByModel,
} from '../controller/user.controller';
import {
  changeModelTimestamp,
  encrypt_password,
  errorHandler,
  regexTestDecoded,
} from '../lib/common';
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  REG_ENG_NUM,
  REG_ENG_NUM_KR,
} from '../lib/constant';
import { DB } from '../lib/sequelize';
import {
  authentication,
  getUserRole,
  getUserType,
  hasUserAccessRouter,
} from '../middleware/user.middleware';
import { user } from '../models/user';

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
 *        name: user_name
 *        description: 이름으로 조회. 공백일 때 본인 정보 조회. +210704 토큰필수.
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
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    let user_name = <string>req.query.user_name;
    if (!user_name) {
      const theUser = await user.findOne({
        where: { user_id: req.body._user_id, is_active: 'Y' },
      });
      if (!theUser) {
        return res.status(BAD_REQUEST).json({ error: 'user not founded' });
      }
      user_name = <string>theUser.user_name;
    }

    const theUser = await getUserByName(user_name);
    if (typeof theUser == 'string') {
      return res.status(BAD_REQUEST).json({ error: 'user not founded' });
    }

    res.status(OK).json({
      ...theUser.get({ plain: true }),
      date_create: changeModelTimestamp(theUser.date_create!),
    });
  })
);

/**
 * @swagger
 * /api/auth/unregister:
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
router.delete(
  '/unregister',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  async (req: Request, res: Response) => {
    const result = await deleteUser(req.body._user_id);

    if (result != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: result });
    }

    res.status(OK).json({ success: 'inactive' });
  }
);

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
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
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
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
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

/**
 * @swagger
 * /api/auth/modify:
 *  patch:
 *    tags: [회원]
 *    summary: 회원정보 수정
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: false
 *        name: password
 *        description: 비밀번호(변경하지 않을 시 입력X)
 *      - in: formData
 *        type: string
 *        required: false
 *        name: display_name
 *        description: 닉네임(변경하지 않을 시 입력X)
 *      - in: formData
 *        type: file
 *        required: false
 *        name: user_thumbnail
 *        description: 썸네일(변경하지 않을 시 입력X, 하나만 첨부가능)
 *      - in: formData
 *        type: string
 *        required: true
 *        name: force
 *        default: N
 *        description: 기존 썸네일 초기화 Y | N
 *    security:
 *      - refresh: []
 *    responses:
 *      200:
 *        description: success
 */
router.patch(
  '/modify',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(getUserRole),
  errorHandler(hasUserAccessRouter),
  errorHandler(async (req: Request, res: Response) => {
    const password = req.body.password;
    const display_name = req.body.display_name;
    const force = req.body.force;

    const myInfo = await getUserById(req.body._user_id);
    if (typeof myInfo == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: myInfo });
    }

    if (password) {
      if (password.length < 4 || password.length > 30) {
        return res
          .status(BAD_REQUEST)
          .json({ error: 'password length is too short or too long' });
      }
      if (!regexTestDecoded(REG_ENG_NUM, password)) {
        return res.status(BAD_REQUEST).json({
          error: 'password is english and number only',
        });
      }
      if (myInfo.password == encrypt_password(password)) {
        return res
          .status(BAD_REQUEST)
          .json({ error: 'same as the previous password' });
      }
      myInfo.password = encrypt_password(password);
    }

    if (display_name) {
      if (display_name.length < 2 || display_name.length > 10) {
        return res
          .status(BAD_REQUEST)
          .json({ error: 'display_name length is too short or too long' });
      }
      if (!regexTestDecoded(REG_ENG_NUM_KR, display_name)) {
        return res.status(BAD_REQUEST).json({
          error: 'display_name is english and number only',
        });
      }
      if (typeof (await getUserByDisplayName(display_name)) != 'string') {
        return res
          .status(INTERNAL_ERROR)
          .json({ error: 'display_name already exist' });
      }
      myInfo.display_name = display_name;
    }

    if (!['Y', 'N'].includes(force)) {
      return res.status(BAD_REQUEST).json({ error: 'invalid force' });
    }

    try {
      const transactionResult = await DB.transaction(async (transaction) => {
        const prevUserThumbNail = myInfo.user_thumbnail;
        if (force == 'Y') {
          myInfo.user_thumbnail = null!;
        } else if (
          req.files &&
          !isArray(req.files) &&
          req.files.user_thumbnail
        ) {
          if (req.files.user_thumbnail.length > 1) {
            throw new Error('only one user_thumbnail can be registered');
          }
          const url = await fileUploadReturnUrl(
            req.body._user_id,
            req.files.user_thumbnail,
            transaction
          );
          if (typeof url == 'string') {
            throw new Error(url);
          }
          myInfo.user_thumbnail = url.file_folder_id;
        }

        const updatedUser = await setUserByModel(
          myInfo,
          myInfo.get({ plain: true }),
          transaction
        );
        if (typeof updatedUser == 'string') {
          throw new Error(updatedUser);
        }
        if (password && updatedUser.password != myInfo.password) {
          throw new Error('password update error');
        }
        if (display_name && updatedUser.display_name != myInfo.display_name) {
          throw new Error('display_name update error');
        }

        if (force == 'Y' && prevUserThumbNail) {
          const deleteResult = await deleteFileFolderDevelop(
            prevUserThumbNail,
            transaction
          );
          if (deleteResult != 'ok') {
            throw new Error(deleteResult);
          }
        }

        return await getUserByIdExceptPassword(
          updatedUser.user_id!,
          transaction
        );
      });
      res.status(OK).json(transactionResult);
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ error: error.message });
    }
  })
);

export default router;
