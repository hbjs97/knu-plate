import { Request, Response, Router } from 'express';
import { isArray } from 'lodash';
import { fileUploadReturnUrl } from '../controller/file.controller';
import { sendUsernameToUsermail } from '../controller/mail.auth.controller';
import {
  displayNameDuplicateChecker,
  getUserByIdExceptPassword,
  getUserByMailAddress,
  insertUser,
  loginProcess,
  setUserByModel,
  userDuplicateChecker,
  userNameDuplicateChecker,
  userValidator,
} from '../controller/user.controller';
import {
  encrypt_password,
  errorHandler,
  regexTestDecoded,
} from '../lib/common';
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  REG_EMAIL,
  REG_ENG_NUM,
  REG_ENG_NUM_KR,
} from '../lib/constant';
import { DB } from '../lib/sequelize';
import { userAttributes } from '../models/user';

const router = Router();

/**
 * @swagger
 * /api/signup:
 *  post:
 *    tags: [회원 - 인증]
 *    summary: 회원가입
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: user_name
 *        description: 로그인 아이디. 4자 이상 20자 제한. 영어, 숫자 입력가능.
 *      - in: formData
 *        type: string
 *        required: true
 *        name: display_name
 *        description: 표시할 이름. 표시할 이름 2자 이상 10자 이하.
 *      - in: formData
 *        type: string
 *        required: true
 *        name: password
 *        description: 비밀번호. 4자 이상 30자 제한.
 *      - in: formData
 *        type: string
 *        required: true
 *        name: mail_address
 *        description: 메일 주소
 *      - in: formData
 *        type: file
 *        required: false
 *        name: user_thumbnail
 *        description: 썸네일
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.post(
  '/signup',
  errorHandler(async (req: Request, res: Response) => {
    const userInfo: userAttributes = {};

    userInfo.user_name = req.body.user_name.trim();
    userInfo.display_name = req.body.display_name.trim();
    userInfo.password = encrypt_password(String(req.body.password.trim()));
    userInfo.mail_address = req.body.mail_address;

    // user_name
    if (!userInfo.user_name) {
      return res.status(BAD_REQUEST).json({ error: 'user_name is empty' });
    }
    if (userInfo.user_name.length < 4 || userInfo.user_name.length > 20) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'user_name length is too short or too long' });
    }
    if (!regexTestDecoded(REG_ENG_NUM, userInfo.user_name)) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'username is english and number only' });
    }

    // password
    if (!req.body.password) {
      return res.status(BAD_REQUEST).json({ error: 'password is empty' });
    }
    if (req.body.password.length < 4 || req.body.password.length > 30) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'password length is too short or too long' });
    }
    if (!regexTestDecoded(REG_ENG_NUM, req.body.password)) {
      return res.status(BAD_REQUEST).json({
        error: 'password is english and number only',
      });
    }

    // display_name
    if (!userInfo.display_name) {
      return res.status(BAD_REQUEST).json({ error: 'display_name is empty' });
    }
    if (userInfo.display_name.length < 2 || userInfo.display_name.length > 10) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'display_name length is too short or too long' });
    }
    if (!regexTestDecoded(REG_ENG_NUM_KR, userInfo.display_name)) {
      return res.status(BAD_REQUEST).json({
        error: 'display_name is english and number only',
      });
    }

    const isDuplicated = await userDuplicateChecker(
      userInfo.user_name,
      userInfo.display_name
    );
    if (typeof isDuplicated == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: isDuplicated });
    }

    if (userInfo.mail_address) {
      if (userInfo.mail_address.length > 255) {
        return res.status(BAD_REQUEST).json({ error: 'mail_address too long' });
      }
      if (!regexTestDecoded(REG_EMAIL, userInfo.mail_address)) {
        return res.status(BAD_REQUEST).json({
          error: 'incorrect mail_address format',
        });
      }
    }
    // verification

    // insert into db
    try {
      const transactionResult = await DB.transaction(async (transaction) => {
        const theUser = await insertUser(userInfo, transaction);
        if (typeof theUser == 'string') {
          return res.status(INTERNAL_ERROR).json({ error: theUser });
        }

        if (req.files && !isArray(req.files) && req.files.user_thumbnail) {
          if (req.files.user_thumbnail.length > 1) {
            throw new Error('only one user_thumbnail can be registered');
          }
          const url = await fileUploadReturnUrl(
            theUser.user_id!,
            req.files.user_thumbnail,
            transaction
          );
          if (typeof url == 'string') {
            throw new Error(url);
          }

          theUser.user_thumbnail = url.file_folder_id;
          const thumbnailUpdatedUser = await setUserByModel(
            theUser,
            theUser.get({ plain: true }),
            transaction
          );
          if (typeof thumbnailUpdatedUser == 'string') {
            throw new Error('user_thumbnail update fail');
          }
        }

        return await getUserByIdExceptPassword(theUser.user_id!, transaction);
      });

      res.status(OK).json(transactionResult);
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ error: error.message });
    }
  })
);

/**
 * @swagger
 * /api/login:
 *  post:
 *    tags: [회원 - 인증]
 *    summary: 로그인
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: user_name
 *        description: 로그인 이름
 *      - in: formData
 *        type: string
 *        required: true
 *        name: password
 *        description: 비밀번호
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
  '/login',
  errorHandler(async (req: Request, res: Response) => {
    const userName = req.body.user_name.trim();
    const notEncryptedPassword = req.body.password.trim();

    if (!userName) {
      return res.status(BAD_REQUEST).json({ error: 'user_name is empty' });
    }
    if (!notEncryptedPassword) {
      return res.status(BAD_REQUEST).json({ error: 'password is empty' });
    }

    const password = encrypt_password(String(notEncryptedPassword));
    const userAgent = req.get('User-Agent');

    const theUser = await userValidator(userName, password);
    if (typeof theUser == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theUser });
    }

    const result = await loginProcess(theUser, userAgent);
    if (typeof result == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: result });
    }

    const theUserExceptPassword = {
      ...theUser.get({ plain: true }),
    };
    delete theUserExceptPassword.password;

    res.status(OK).json({
      ...result,
      user: theUserExceptPassword,
    });
  })
);

/**
 * @swagger
 * /api/search/username:
 *  post:
 *    tags: [회원 - 인증]
 *    summary: 아이디 찾기
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: address
 *        description: 가입시 입력한 메일 앞부분(@ 이하 제외)
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
  '/search/username',
  errorHandler(async (req: Request, res: Response) => {
    const address = req.body.address;
    if(!address) {
      return res.status(BAD_REQUEST).json({error : 'input value is empty'});
    }

    const sendResult = await sendUsernameToUsermail(address);
    if(sendResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({error: sendResult});
    }

    res.status(OK).json({result: 'success'});
  })
);



/**
 * @swagger
 * /api/check-user-name:
 *  get:
 *    tags: [회원 - 인증]
 *    summary: 아이디 중복 체크
 *    parameters:
 *      - in: query
 *        type: string
 *        required: true
 *        name: user_name
 *        description: 로그인 이름
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
router.get(
  '/check-user-name',
  errorHandler(async (req: Request, res: Response) => {
    const user_name = <string>req.query.user_name;
    if (!user_name) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }
    const isDuplicated = await userNameDuplicateChecker(user_name);
    if (isDuplicated) {
      return res.status(BAD_REQUEST).json({ error: 'already exist user_name' });
    }
    res.status(OK).json({ result: 'not duplicated' });
  })
);
/**
 * @swagger
 * /api/check-display-name:
 *  get:
 *    tags: [회원 - 인증]
 *    summary: 닉네임 중복 체크
 *    parameters:
 *      - in: query
 *        type: string
 *        required: true
 *        name: display_name
 *        description: 닉네임
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
router.get(
  '/check-display-name',
  errorHandler(async (req: Request, res: Response) => {
    const display_name = <string>req.query.display_name;
    if (!display_name) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }
    const isDuplicated = await displayNameDuplicateChecker(display_name);
    if (isDuplicated) {
      return res
        .status(BAD_REQUEST)
        .json({ error: 'already exist display_name' });
    }
    res.status(OK).json({ result: 'not duplicated' });
  })
);

export default router;
