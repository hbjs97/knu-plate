import axios from 'axios';
import { KAKAOAK } from '../lib/config';
import { FOOD_CATEGORY, KAKAO_MAP_API_URL, PER_PAGE } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { Op, Sequelize } from 'sequelize';
import { addressOutput } from '../lib/type';
import { mall, mallAttributes } from '../models/mall';

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
  if (isExist.length == 1) {
    return 'ok';
  } else {
    return 'validate fail';
  }
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
  mallModel: mallAttributes,
  files:
    | Express.Multer.File[]
    | {
        [fieldname: string]: Express.Multer.File[];
      }
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

  // TODO: fileUpload and getUrl
  // TODO: counselData.doc_company_profile = getUrl from fileUpload

  const enrolledMall = await mall.create(mallModel);
  if (!enrolledMall) {
    return 'create mall fail';
  }
  return await getMallById(enrolledMall.mall_id!);
}

export async function getMallById(mall_id: number): Promise<mall | string> {
  const theMall = await mall.findOne({
    where: { mall_id: mall_id },
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
