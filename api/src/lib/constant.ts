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

// text dataForm 입력과 선언된 텍스트에 맞는 파일을 받음
// '-'만 특수문자 입력 가능
export const uploadFileType = {};

export const PER_PAGE = 9;
