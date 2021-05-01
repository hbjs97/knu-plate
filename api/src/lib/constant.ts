import { mall } from '../models/mall';
import { review } from '../models/review';
import { user } from '../models/user';

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const PAYLOAD_TOO_LARGE = 413;

export const OK = 200;

export const INTERNAL_ERROR = 500;

export const REG_ENG_NUM = /^[a-zA-Z0-9]+$/;
export const REG_ENG_NUM_KR = /^[a-zA-Z0-9\uac00-\ud7af]+$/;
export const REG_MOBILE_PHONE = /^\d{3}-\d{3,4}-\d{4}$/;
export const REG_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// text dataForm 입력과 선언된 텍스트에 맞는 파일을 받음
// '-'만 특수문자 입력 가능
export const uploadFileType = {
  medal_list: {
    model: user,
    field: 'medal_list',
  },
  user_thumbnail: {
    model: user,
    field: 'user_thumbnail',
  },
  thumbnail: {
    model: mall,
    field: 'thumbnail',
  },
  review_image: {
    model: review,
    field: 'review_image',
  },
};

export const PER_PAGE = 9;

export const EXPIRE_AUTH_MAIL = 3;

export const USER_ROLE_GROUP = {
  ADMIN: 1,
  NON_AUTH_USER: 2,
  AUTH_USER: 3,
};

export const KAKAO_MAP_API_URL =
  'https://dapi.kakao.com/v2/local/search/keyword.json';

export const FOOD_CATEGORY = ['한식', '중식', '일식', '양식', '카페', '술집'];
// 세계 음식: 그 외
