class ErrorCodeVo {
  readonly status;
  readonly message;
  readonly data;

  constructor(status, message) {
    this.status = status;
    this.message = message;
    this.data = '';
  }
}

export type ErrorCode = ErrorCodeVo;

export const ENTITY_BAD_REQUEST = new ErrorCodeVo(
  400,
  '유효하지 않은 요청입니다'
);
export const AUTH_DUPLICATION_REQUEST = new ErrorCodeVo(
  400,
  '이미 가입된 이메일입니다'
);
export const AUTH_SIGNUP_DUPLICATION_REQUEST = new ErrorCodeVo(
  400,
  '이미 가입요청된 이메일입니다'
);
export const AUTH_NOT_FOUND_REQUEST = new ErrorCodeVo(
  400,
  '존재하지 않는 이메일입니다'
);
export const AUTH_SIGNIN_DUPLICATION_REQUEST = new ErrorCodeVo(
  400,
  '이미 로그인 요청된 이메일입니다'
);
export const AUTH_SIGNUP_FAILURE = new ErrorCodeVo(
  400,
  '회원 등록에 실패했습니다'
);
