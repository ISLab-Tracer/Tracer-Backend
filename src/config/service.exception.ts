import {
  AUTH_DUPLICATION_REQUEST,
  AUTH_NOT_FOUND_REQUEST,
  AUTH_SIGNIN_DUPLICATION_REQUEST,
  AUTH_SIGNUP_DUPLICATION_REQUEST,
  AUTH_SIGNUP_FAILURE,
  ENTITY_BAD_REQUEST,
  ErrorCode,
} from './error.code';

export const EntityBadRequestException = (
  message?: string
): ServiceException => {
  return new ServiceException(ENTITY_BAD_REQUEST, message);
};
export const AuthDuplicationRequestException = (
  message?: string
): ServiceException => {
  return new ServiceException(AUTH_DUPLICATION_REQUEST, message);
};
export const AuthSignupDuplicationRequestException = (
  message?: string
): ServiceException => {
  return new ServiceException(AUTH_SIGNUP_DUPLICATION_REQUEST, message);
};
export const AuthNotFoundRequestException = (
  message?: string
): ServiceException => {
  return new ServiceException(AUTH_NOT_FOUND_REQUEST, message);
};
export const AuthSigninDuplicationRequestException = (
  message?: string
): ServiceException => {
  return new ServiceException(AUTH_SIGNIN_DUPLICATION_REQUEST, message);
};
export const AuthSignupFailureException = (
  message?: string
): ServiceException => {
  return new ServiceException(AUTH_SIGNUP_FAILURE, message);
};

export class ServiceException extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }

    super(message);

    this.errorCode = errorCode;
  }
}
