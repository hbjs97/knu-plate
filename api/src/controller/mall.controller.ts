import axios from 'axios';
import { KAKAOAK } from '../lib/config';
import {
  CENTER_POSITION,
  CENTER_RANGE,
  FOOD_CATEGORY,
  GATE_NAME,
  GATE_POSITION,
  KAKAO_MAP_API_URL,
  PER_PAGE,
} from '../lib/constant';
import { Op, Sequelize, Transaction } from 'sequelize';
import { addressOutput, mallExpand } from '../lib/type';
import { mall, mallAttributes } from '../models/mall';
import { menu } from '../models/menu';
import { getMyRecommend, getMyRecommendList } from './my.recommend.controller';
import { getDistance } from 'geolib';

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
      v.y == mallData.latitude
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
  mallModel: mallAttributes
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

  const enrolledMall = await mall.create(mallModel);
  if (!enrolledMall) {
    return 'create mall fail';
  }
  return await getMallById(enrolledMall.mall_id!);
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
  },
  pageOption: {
    cursor: number;
  }
): Promise<mall[]> {
  let whereAttribute = {};
  whereAttribute = {
    is_active: 'Y',
    mall_id: {
      [Op.gt]: pageOption.cursor,
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

  const mallList = await mall.findAll({
    where: whereAttribute,
    // TODO: include my_recommand
    limit: PER_PAGE,
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
  user_id: string
): Promise<mallExpand | string> {
  let expandedMallInfo: null | mallExpand = await mall.findOne({
    where: {
      mall_id,
      is_active: 'Y',
    },
    raw: true,
  });
  if (!expandedMallInfo) {
    return 'mall not founded';
  }

  expandedMallInfo = {
    ...expandedMallInfo,
    menu: await menu.findAll({ where: { mall_id } }),
  };

  const myRecommend = await getMyRecommend(user_id, mall_id);
  expandedMallInfo =
    typeof myRecommend != 'string'
      ? (expandedMallInfo = {
          ...expandedMallInfo,
          my_recommend: 'Y',
        })
      : (expandedMallInfo = {
          ...expandedMallInfo,
          my_recommend: 'N',
        });

  if (!expandedMallInfo) {
    return 'detailMallInfo not founded';
  }
  return expandedMallInfo;
}

export async function getMyRecommendMallList(
  user_id: string,
  cursor: number
): Promise<mall[] | string> {
  const myRecommendList = await getMyRecommendList(user_id);
  if (typeof myRecommendList == 'string') {
    return myRecommendList;
  }
  const mallIdList: number[] = myRecommendList.map((v) => v.mall_id!);

  const myRecommendMallList = await mall.findAll({
    where: {
      [Op.and]: [
        {
          mall_id: mallIdList,
        },
        {
          mall_id: {
            [Op.gt]: cursor,
          },
        },
      ],
      is_active: 'Y',
    },
    limit: PER_PAGE,
  });

  return myRecommendMallList;
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
      name: GATE_NAME.NORTH,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_POSITION.NORTH
      ),
    },
    {
      name: GATE_NAME.MAIN,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_POSITION.MAIN
      ),
    },
    {
      name: GATE_NAME.WEST,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_POSITION.WEST
      ),
    },
    {
      name: GATE_NAME.EAST,
      distance: getDistance(
        { latitude: mallData.latitude!, longitude: mallData.longitude! },
        GATE_POSITION.EAST
      ),
    }
  );
  distanceFromGate.sort((a, b) => {
    return a.distance < b.distance ? -1 : 1;
  });
  return distanceFromGate[0].name;
}
