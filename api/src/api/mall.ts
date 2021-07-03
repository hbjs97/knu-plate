import { Request, Response, Router } from 'express';
import { isArray } from 'lodash';
import { fileUploadReturnUrl } from '../controller/file.controller';
import {
  deleteMall,
  enrollMall,
  getAddressListFromKakaoMapApi,
  getDetailMall,
  getMallById,
  getMallList,
  getMyRecommendMallList,
  getReviewImageListFromMall,
  mallValidationChecker,
} from '../controller/mall.controller';
import {
  deleteRecommendFromMall,
  recommendMall,
} from '../controller/my.recommend.controller';
import {
  changeModelTimestamp,
  errorHandler,
  regexTestDecoded,
} from '../lib/common';
import {
  BAD_REQUEST,
  GATE_INFO,
  INTERNAL_ERROR,
  OK,
  REG_MOBILE_PHONE,
  UNAUTHORIZED,
} from '../lib/constant';
import { DB } from '../lib/sequelize';
import { verificationToken } from '../lib/type';
import { authentication, getUserType } from '../middleware/user.middleware';
import { mallAttributes } from '../models/mall';
import jwt from 'jsonwebtoken';
import { JWT_SALT } from '../lib/config';

const router = Router();

/**
 * @swagger
 * /api/mall:
 *  post:
 *    tags: [매장]
 *    summary: 매장 등록
 *    parameters:
 *      - in: formData
 *        type: string
 *        required: true
 *        name: mall_name
 *        description: 매장 이름
 *      - in: formData
 *        type: string
 *        required: false
 *        name: contact
 *        description: 연락처
 *      - in: formData
 *        type: string
 *        required: true
 *        name: category_name
 *        description: 카테고리
 *      - in: formData
 *        type: string
 *        required: true
 *        name: address
 *        description: 주소
 *      - in: formData
 *        type: number
 *        required: true
 *        name: latitude
 *        description: 위도
 *      - in: formData
 *        type: number
 *        required: true
 *        name: longitude
 *        description: 경도
 *      - in: formData
 *        type: file
 *        required: false
 *        name: thumbnail
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
  '/',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(async (req: Request, res: Response) => {
    const mall_name = req.body.mall_name;
    const contact = req.body.contact;
    const category_name = req.body.category_name;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (!mall_name || !category_name || !address || !latitude || !longitude) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }
    if (contact) {
      if (!regexTestDecoded(REG_MOBILE_PHONE, contact)) {
        return res.status(BAD_REQUEST).json({
          error: 'incorrect contact format',
        });
      }
    }

    const resultValidator = await mallValidationChecker({
      mall_name,
      address,
      category_name,
      longitude,
      latitude,
    });
    if (resultValidator != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: resultValidator });
    }

    const mallData: mallAttributes = {
      mall_name,
      contact,
      category_name,
      address,
      latitude,
      longitude,
      user_id: req.body._user_id,
    };

    try {
      const transactionResult = await DB.transaction(async (transaction) => {
        if (req.files && !isArray(req.files) && req.files.thumbnail) {
          const url = await fileUploadReturnUrl(
            req.body._user_id,
            req.files.thumbnail,
            transaction
          );
          if (typeof url != 'string') {
            mallData.thumbnail = url.file_folder_id;
          }
        }
        // else {
        //   // init blank file directroy
        //   const mallUrl = await initMallFileFolder(
        //     req.body._user_id,
        //     transaction
        //   );
        //   if (typeof mallUrl == 'string') {
        //     throw new Error(mallUrl);
        //   }
        //   mallData.thumbnail = mallUrl.file_folder_id;
        // }

        const enrolledMall = await enrollMall(mallData, transaction);
        if (typeof enrolledMall == 'string') {
          throw new Error(enrolledMall);
        }
        return enrolledMall;
      });

      res.status(OK).json({
        ...transactionResult.get({ plain: true }),
        date_create: changeModelTimestamp(transactionResult.date_create!),
      });
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ error: error.message });
    }
  })
);

/**
 * @swagger
 * /api/mall/recommend/{mall_id}:
 *  post:
 *    tags: [매장]
 *    summary: 매장 추천
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.post(
  '/recommend/:mall_id',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(async (req: Request, res: Response) => {
    const mall_id = Number(req.params.mall_id);
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const recommendResult = await recommendMall(mall_id, req.body._user_id);
    if (recommendResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: recommendResult });
    }
    res.status(OK).json({ result: 'success' });
  })
);

/**
 * @swagger
 * /api/mall:
 *  get:
 *    tags: [매장]
 *    summary: 매장 목록 조회
 *    parameters:
 *      - in: query
 *        type: string
 *        required: false
 *        name: mall_name
 *        description: 매장 이름
 *      - in: query
 *        type: string
 *        required: false
 *        name: category_name
 *        description: 카테고리 이름
 *      - in: query
 *        type: string
 *        required: false
 *        name: gate_location
 *        description: NORTH | MAIN | WEST | EAST
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
    const mall_name = <string>req.query.mall_name;
    const category_name = <string>req.query.category_name;
    let gate_location = <string>req.query.gate_location;
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;

    if (gate_location) {
      if (!Object.keys(GATE_INFO).includes(gate_location)) {
        return res
          .status(BAD_REQUEST)
          .json({ error: 'invalid gate_location info' });
      }
      gate_location = GATE_INFO[<keyof typeof GATE_INFO>gate_location].name;
    }

    const mallList = await getMallList(
      { mall_name, category_name, gate_location },
      { cursor }
    );
    if (typeof mallList == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: mallList });
    }
    const result = mallList.map((v) => {
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
 * /api/mall/my-recommend:
 *  get:
 *    tags: [매장]
 *    summary: 내 추천 매장 목록 조회
 *    parameters:
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
  '/my-recommend',
  errorHandler(async (req: Request, res: Response) => {
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;
    const myRecommendMallList = await getMyRecommendMallList(
      req.body._user_id,
      cursor
    );
    if (typeof myRecommendMallList == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: myRecommendMallList });
    }
    const result = myRecommendMallList.map((v) => {
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
 * /api/mall/address:
 *  get:
 *    tags: [매장]
 *    summary: 매장 주소 검색
 *    parameters:
 *      - in: query
 *        type: string
 *        required: true
 *        name: keyword
 *        description: 매장 이름
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
  '/address',
  errorHandler(async (req: Request, res: Response) => {
    const keyword = String(req.query.keyword);
    const pageNumber = Number(req.query.page) || 1;
    if (!keyword || !pageNumber) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const addressListFromKakaoMapApi = await getAddressListFromKakaoMapApi(
      keyword,
      pageNumber
    );
    if (typeof addressListFromKakaoMapApi == 'string') {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: addressListFromKakaoMapApi });
    }

    res.status(OK).json(addressListFromKakaoMapApi);
  })
);

/**
 * @swagger
 * /api/mall/review-images:
 *  get:
 *    tags: [매장]
 *    summary: 매장 리뷰 이미지 목록 조회
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
 *        description: 현재 페이지 마지막 파일 인덱스 (file.index)
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/review-images',
  errorHandler(async (req: Request, res: Response) => {
    const cursor = Number(req.query.cursor) || Number.MAX_SAFE_INTEGER;
    const mall_id = Number(req.query.mall_id);
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theMall = await getMallById(mall_id);
    if (typeof theMall == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theMall });
    }
    if (theMall.is_active != 'Y') {
      return res.status(INTERNAL_ERROR).json({ error: 'inactive mall' });
    }

    const fileList = await getReviewImageListFromMall(
      theMall.get({ plain: true }),
      cursor
    );
    res.status(OK).json(fileList);
  })
);

/**
 * @swagger
 * /api/mall/{mall_id}:
 *  get:
 *    tags: [매장]
 *    summary: 매장 상세 조회
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/:mall_id',
  errorHandler(async (req: Request, res: Response) => {
    const mall_id = Number(req.params.mall_id);
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    if (req.headers.authorization) {
      const token = <string>req.headers.authorization;
      if (!token.includes('Bearer ')) {
        return res.status(UNAUTHORIZED).json({ error: 'invalid token type' });
      }
      const checkedToken = token.replace('Bearer ', '');

      const verifyToken: verificationToken | string = jwt.verify(
        checkedToken,
        JWT_SALT
      );
      if (typeof verifyToken == 'string') {
        return res.status(UNAUTHORIZED).json({ error: 'token verify fail' });
      }

      req.body._user_id = verifyToken.user_id;
    }

    const detailMall = await getDetailMall(
      mall_id,
      req.body._user_id ? req.body._user_id : null
    );
    if (typeof detailMall == 'string') {
      return res.status(BAD_REQUEST).json({ error: detailMall });
    }
    res.status(OK).json(detailMall);
  })
);

/**
 * @swagger
 * /api/mall/recommend/{mall_id}:
 *  delete:
 *    tags: [매장]
 *    summary: 매장 추천 삭제
 *    parameters:
 *      - in: path
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.delete(
  '/recommend/:mall_id',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(async (req: Request, res: Response) => {
    const mall_id = Number(req.params.mall_id);
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const recommendResult = await deleteRecommendFromMall(
      mall_id,
      req.body._user_id
    );
    if (recommendResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: recommendResult });
    }
    res.status(OK).json({ result: 'success' });
  })
);

/**
 * @swagger
 * /api/mall/{mall_id}:
 *  delete:
 *    tags: [매장]
 *    summary: 매장 삭제
 *    parameters:
 *      - in: formData
 *        type: path
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.delete(
  '/:mall_id',
  errorHandler(authentication),
  errorHandler(getUserType),
  errorHandler(async (req: Request, res: Response) => {
    const mall_id = Number(req.params.mall_id);
    if (!mall_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const deleteResult = await deleteMall(mall_id);
    if (deleteResult != 'ok') {
      return res.status(INTERNAL_ERROR).json({ error: deleteResult });
    }

    res.status(OK).json({ result: 'ok' });
  })
);

export default router;
