import { Request, Response, Router } from 'express';
import {
  deleteMall,
  enrollMall,
  getAddressListFromKakaoMapApi,
  getDetailMall,
  getMallList,
  mallValidationChecker,
} from '../controller/mall.controller';
import {
  changeModelTimestamp,
  errorHandler,
  regexTestDecoded,
} from '../lib/common';
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  REG_MOBILE_PHONE,
} from '../lib/constant';
import { DB } from '../lib/sequelize';
import { mallAttributes } from '../models/mall';

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
  errorHandler(async (req: Request, res: Response) => {
    const mall_name = req.body.mall_name;
    const contact = req.body.contact;
    const category_name = req.body.category_name;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const thumbnail = req.body.thumbnail;

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

    const enrolledMall = await enrollMall(mallData, req.files);
    if (typeof enrolledMall == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledMall });
    }

    res.status(OK).json({
      ...enrolledMall.get({ plain: true }),
      date_create: changeModelTimestamp(enrolledMall.date_create!),
    });
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
    const cursor = Number(req.query.cursor) || 0;

    const mallList = await getMallList(
      { mall_name, category_name },
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

    const detailMall = await getDetailMall(mall_id, req.body._user_id);
    if (typeof detailMall == 'string') {
      return res.status(BAD_REQUEST).json({ error: detailMall });
    }
    res.status(OK).json(detailMall);
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
