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

export const CENTER_POSITION = {
  latitude: 35.889529,
  longitude: 128.609971,
};

export const CENTER_RANGE = 1000; // (meter)

export const GATE_INFO = {
  NORTH: {
    name: '북문',
    position: {
      latitude: 35.89233,
      longitude: 128.60939,
    },
  },
  MAIN: {
    name: '정문/쪽문',
    position: {
      latitude: 35.8852,
      longitude: 128.61465,
    },
  },
  WEST: {
    name: '서문',
    position: {
      latitude: 35.88844,
      longitude: 128.60398,
    },
  },
  EAST: {
    name: '동문',
    position: {
      latitude: 35.88853,
      longitude: 128.61661,
    },
  },
};

export const MEDAL_CATEGORY_COUNT = [10, 50];
export const MEDAL_CATEGORY_OBJECT = {
  10: 10,
  50: 50,
};
export const MEDAL_CATEGORY = {
  BRONZE: 3,
  SILVER: 2,
  GOLD: 1,
};

export const REPORT_PROCESS = ['proceeding', 'sanctioned', 'passed'];

export const PERMISSION_LIST = {
  GET: 'read_permission',
  POST: 'create_permission',
  PATCH: 'update_permission',
  DELETE: 'delete_permission',
};

export const USER_COMMON_AUTORITY = [
  ['GET', '/api/auth'],
  ['POST', '/api/auth/logout'],
  ['POST', '/api/auth/refresh'],
  ['DELETE', '/api/auth/unregister'],
  ['PATCH', '/api/auth/modify'],
];

export const AUTHORITY_TYPE_LIST = {
  mail_auth: {
    description: '메일인증 권한',
    match: [
      ['POST', '/api/mail-auth/issuance'],
      ['PATCH', '/api/mail-auth/verification'],
    ],
  },
  mall: {
    description: '매장 권한',
    match: [
      ['GET', '/api/mall'],
      ['GET', '/api/mall/my-recommend'],
      ['GET', '/api/mall/address'],
      ['GET', '/api/mall/review-images'],
      ['POST', '/api/mall'],
      ['POST', '/api/mall/recommend'],
      ['DELETE', '/api/mall'],
      ['DELETE', '/api/mall/recommend'],
    ],
  },
  menu: {
    description: '메뉴 권한',
    match: [
      ['POST', '/api/menu'],
      ['PATCH', '/api/menu'],
      ['DELETE', '/api/menu'],
    ],
  },
  notice: {
    description: '공지 권한',
    match: [
      ['GET', '/api/notice'],
      ['POST', '/api/notice'],
      ['PATCH', '/api/notice'],
      ['DELETE', '/api/notice'],
    ],
  },
  report: {
    description: '신고 권한',
    match: [
      ['GET', '/api/report'],
      ['POST', '/api/report'],
      ['PATCH', '/api/report'],
    ],
  },
  review: {
    description: '리뷰 권한',
    match: [
      ['GET', '/api/review'],
      ['POST', '/api/review'],
      ['DELETE', '/api/review'],
    ],
  },
  suggestion: {
    description: '건의사항 권한',
    match: [
      ['GET', '/api/suggestion'],
      ['POST', '/api/suggestion'],
    ],
  },
  admin_user: {
    description: '관리자 권한',
    match: [...USER_COMMON_AUTORITY],
  },
  non_auth_user: {
    description: '메일 비인증 사용자 권한',
    match: [...USER_COMMON_AUTORITY],
  },
  auth_user: {
    description: '메일 인증 사용자 권한',
    match: [...USER_COMMON_AUTORITY],
  },
  dashboard: {
    description: '대시보드 권한',
    match: [['GET', '/api/dashboard']],
  },
};
