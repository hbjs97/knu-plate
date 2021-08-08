import axios from 'axios';
import { KAKAOAK } from '../lib/config';
import {
  CENTER_POSITION,
  CENTER_RANGE,
  FOOD_CATEGORY,
  GATE_INFO,
  KAKAO_MAP_API_URL,
  PER_PAGE,
} from '../lib/constant';
import { Op, Sequelize, Transaction } from 'sequelize';
import { addressOutput, mallExpand } from '../lib/type';
import { mall, mallAttributes } from '../models/mall';
import { menu } from '../models/menu';
import { getMyRecommend, getMyRecommendList } from './my.recommend.controller';
import { getDistance } from 'geolib';
import { file } from '../models/file';
import { review } from '../models/review';
import { isEqual, reduce } from 'lodash';

export async function mallValidationChecker(
  mallData: mallAttributes
): Promise<string> {
  const addressListFromKakao = await getAddressListFromKakaoMapApi(
    mallData.mall_name!,
    1
  );
  if (typeof addressListFromKakao == 'string') {
    return addressListFromKakao;
  }

  const isExist = addressListFromKakao.result.filter((v) => {
    if (
      v.place_name == mallData.mall_name &&
      v.category_name == mallData.category_name &&
      (v.address_name == mallData.address ||
        v.road_address_name == mallData.address) &&
      v.x == mallData.longitude &&
      v.y == mallData.latitude &&
      v.id == mallData.kakao_mall_id
    ) {
      return true;
    }
    return false;
  });

  if (!isExist.length) {
    return 'validate fail';
  }
  const distanceFromCenter = getDistanceFromCenter({
    latitude: mallData.latitude!,
    longitude: mallData.longitude!,
  });
  if (distanceFromCenter > CENTER_RANGE) {
    return 'the mall is out of range';
  }

  return 'ok';
}

export async function getAddressListFromKakaoMapApi(
  keyword: string,
  pageNumber: number
): Promise<
  | {
      result: addressOutput[];
      is_end: string;
      pageable_count: number;
    }
  | string
> {
  try {
    const addressList = await axios({
      url: KAKAO_MAP_API_URL,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'KakaoAK ' + KAKAOAK,
      },
      params: {
        query: keyword,
        page: pageNumber,
        size: PER_PAGE,
        x: CENTER_POSITION.longitude,
        y: CENTER_POSITION.latitude,
        radius: CENTER_RANGE,
      },
    });
    return {
      result: addressList.data.documents,
      is_end: addressList.data.meta.is_end,
      pageable_count: addressList.data.meta.pageable_count,
    };
  } catch (error) {
    return error.message;
  }
}

export async function enrollMall(
  mallModel: mallAttributes,
  transaction?: Transaction
): Promise<mall | string> {
  const duplicateMallChecker = await mall.findAll({
    where: {
      mall_name: mallModel.mall_name,
      address: mallModel.address,
      latitude: mallModel.latitude,
      longitude: mallModel.longitude,
    },
  });
  if (duplicateMallChecker.length) {
    return 'already enrolled mall';
  }

  const filteredCategory = FOOD_CATEGORY.filter((v) => {
    if (mallModel.category_name?.includes(v)) {
      return true;
    }
    return false;
  });
  if (filteredCategory.length > 1) {
    return 'duplicated category';
  } else if (filteredCategory.length == 1) {
    mallModel.category_name = filteredCategory[0];
  } else {
    mallModel.category_name = '세계 음식';
  }

  mallModel.gate_location = getNearestGateFromMall(mallModel);

  const enrolledMall = await mall.create(mallModel, { transaction });
  if (!enrolledMall) {
    return 'create mall fail';
  }
  return await getMallById(enrolledMall.mall_id!, transaction);
}

export async function getMallById(
  mall_id: number,
  transaction?: Transaction
): Promise<mall | string> {
  const theMall = await mall.findOne({
    where: { mall_id: mall_id },
    transaction,
  });
  if (!theMall) {
    return 'mall not founded';
  }
  return theMall;
}

export async function getMallList(
  mallOption: {
    mall_name?: string;
    category_name?: string;
    gate_location?: string;
  },
  pageOption: {
    cursor: number;
  }
): Promise<(mallAttributes & { reviewCount?: number })[]> {
  let whereAttribute = {};
  whereAttribute = {
    is_active: 'Y',
    mall_id: {
      [Op.lt]: pageOption.cursor,
    },
  };
  if (mallOption.mall_name) {
    whereAttribute = {
      ...whereAttribute,
      mall_name: {
        [Op.like]: '%' + mallOption.mall_name + '%',
      },
    };
  }
  if (mallOption.category_name) {
    whereAttribute = {
      ...whereAttribute,
      category_name: mallOption.category_name,
    };
  }
  if (mallOption.gate_location) {
    whereAttribute = {
      ...whereAttribute,
      gate_location: mallOption.gate_location,
    };
  }

  const includeReviewsMallList: (mall & {
    reviews?: review[];
  })[] = await mall.findAll({
    order: [['mall_id', 'DESC']],
    where: whereAttribute,
    // TODO: include my_recommand
    include: [
      {
        association: 'file_folder',
        include: [
          {
            association: 'files',
          },
        ],
      },
      {
        association: 'reviews',
        where: { is_active: 'Y' },
        attributes: ['review_id'],
        required: false,
      },
    ],
    limit: PER_PAGE,
  });

  const mallList: (mallAttributes & {
    reviewCount?: number;
  })[] = includeReviewsMallList.map((v) => {
    const reviewCount = v.reviews ? v.reviews.length : 0;
    const theMall: mallAttributes & { reviews?: review[] } = {
      ...v.get({ plain: true }),
    };
    delete theMall.reviews;
    return {
      ...theMall,
      reviewCount: reviewCount,
    };
  });

  return mallList;
}

export async function deleteMall(mall_id: number): Promise<string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const deletedMall = await theMall.update({ is_active: 'N' });
  if (deletedMall.is_active != 'N') {
    return 'mall delete fail';
  }

  return 'ok';
}

export async function getDetailMall(
  mall_id: number,
  user_id?: string
): Promise<mallExpand | string> {
  const expandedMallInfo:
    | null
    | (mall & { menu?: menu[]; my_recommend?: string }) = await mall.findOne({
    where: {
      mall_id,
      is_active: 'Y',
    },
    include: [
      {
        association: 'menus',
      },
      {
        association: 'file_folder',
        include: [
          {
            association: 'files',
          },
        ],
      },
    ],
  });
  if (!expandedMallInfo) {
    return 'mall not founded';
  }

  const reviewsCount = await review.findAndCountAll({
    where: {
      mall_id,
      is_active: 'Y',
    },
  });

  if (user_id) {
    const myRecommend = await getMyRecommend(user_id, mall_id);
    const mallInfoAttachedMyRecommend =
      typeof myRecommend != 'string'
        ? {
            ...expandedMallInfo.get({ plain: true }),
            reviewCount: reviewsCount.count,
            my_recommend: 'Y',
          }
        : {
            ...expandedMallInfo.get({ plain: true }),
            reviewCount: reviewsCount.count,
            my_recommend: 'N',
          };
    return mallInfoAttachedMyRecommend;
  }
  return {
    ...expandedMallInfo.get({ plain: true }),
    reviewCount: reviewsCount.count,
    my_recommend: 'N',
  };
}

export async function getMyRecommendMallList(
  user_id: string,
  cursor: number
): Promise<(mallAttributes & { reviewCount?: number })[]> {
  const myRecommendList = await getMyRecommendList(user_id);
  if (typeof myRecommendList == 'string') {
    return [];
  }
  const mallIdList: number[] = myRecommendList.map((v) => v.mall_id!);

  const includeReviewsMyRecommendMallList: (mall & {
    reviews?: review[];
  })[] = await mall.findAll({
    order: [['mall_id', 'DESC']],
    where: {
      [Op.and]: [
        {
          mall_id: mallIdList,
        },
        {
          mall_id: {
            [Op.lt]: cursor,
          },
        },
      ],
      is_active: 'Y',
    },
    include: [
      {
        association: 'file_folder',
        include: [
          {
            association: 'files',
          },
        ],
      },
      {
        association: 'reviews',
        where: { is_active: 'Y' },
        attributes: ['review_id'],
        required: false,
      },
    ],
    limit: PER_PAGE,
  });

  const mallList: (mallAttributes & {
    reviewCount?: number;
  })[] = includeReviewsMyRecommendMallList.map((v) => {
    const reviewCount = v.reviews ? v.reviews.length : 0;
    const theMall: mallAttributes & { reviews?: review[] } = {
      ...v.get({ plain: true }),
    };
    delete theMall.reviews;
    return {
      ...theMall,
      reviewCount: reviewCount,
    };
  });

  return mallList;
}

export function getDistanceFromCenter(from: {
  latitude: number;
  longitude: number;
}): number {
  return getDistance(from, CENTER_POSITION);
}

export function getNearestGateFromMall(mallData: mallAttributes): string {
  const distanceFromGate = [];
  distanceFromGate.push(
    {
      name: GATE_INFO.NORTH.name,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_INFO.NORTH.position
      ),
    },
    {
      name: GATE_INFO.MAIN.name,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_INFO.MAIN.position
      ),
    },
    {
      name: GATE_INFO.WEST.name,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_INFO.WEST.position
      ),
    },
    {
      name: GATE_INFO.EAST.name,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_INFO.EAST.position
      ),
    }
  );
  distanceFromGate.sort((a, b) => {
    return a.distance < b.distance ? -1 : 1;
  });
  return distanceFromGate[0].name;
}

export async function getReviewImageListFromMall(
  mallModel: mallAttributes,
  cursor: number
): Promise<file[]> {
  const reviewList = await review.findAll({
    where: {
      mall_id: mallModel.mall_id,
      is_active: 'Y',
    },
  });
  const reviewImageFileFolderIdList = reviewList.map((v) => {
    return v.review_image!;
  });

  const fileList = await file.findAll({
    order: [['index', 'DESC']],
    where: {
      file_folder_id: reviewImageFileFolderIdList,
      index: {
        [Op.lt]: cursor,
      },
    },
    limit: PER_PAGE,
  });
  return fileList;
}

export async function updateMall(
  mallModel: mallAttributes,
  transaction?: Transaction
): Promise<mall | string> {
  await mall.update(mallModel, {
    where: {
      mall_id: mallModel.mall_id,
    },
    transaction,
  });
  const theMall = await getMallById(mallModel.mall_id!, transaction);
  if (typeof theMall == 'string') {
    return theMall;
  }

  if (!isEqual(mallModel, theMall.get({ plain: true }))) {
    return 'mall thumbnail update fail';
  }

  return theMall;
}

export async function updateMallEvaluate(
  mall_id: number,
  transaction?: Transaction
): Promise<mall | string> {
  const theMall: null | (mall & { reviews?: review[] }) = await mall.findOne({
    where: {
      mall_id,
    },
    include: [
      {
        association: 'reviews',
        where: {
          is_active: 'Y',
        },
        required: false,
      },
    ],
    transaction,
  });
  if (!theMall) {
    return 'mall not founded';
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const average = theMall.reviews
    ? reduce(
        theMall.reviews,
        (sum, review) => {
          return sum + review.evaluate!;
        },
        0
      ) / theMall.reviews.length
    : 0;
  await mall.update(
    {
      ...theMall.get({ plain: true }),
      evaluate_average: average,
    },
    {
      where: {
        mall_id: theMall.mall_id,
      },
      transaction,
    }
  );

  const updatedMall = await getMallById(theMall.mall_id!, transaction);
  if (typeof updatedMall == 'string') {
    return updatedMall;
  }

  return updatedMall;
}
