import {
  GET_REG_SUCCESS,
  GET_REG_FAILED,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_USER,
} from './constants';

export interface IRestoreUser{
    readonly type: typeof  RESTORE_USER;
}
export interface IGetRegSuccess {
  readonly type: typeof GET_REG_SUCCESS;
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
}

export interface IGetRegFailed {
  readonly type: typeof GET_REG_FAILED;
}

export interface IGetAuthSuccess {
  readonly type: typeof GET_AUTH_SUCCESS;
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
}

export interface IGetAuthFailed {
  readonly type: typeof GET_AUTH_FAILED;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export type TAuth =
  | IGetRegSuccess
  | IGetRegFailed
  | IGetAuthSuccess
  | IGetAuthFailed
  | ILogoutSuccess
  | ILogoutFailed
  | IRestoreUser;

export const getRegSuccessAction = (
  accessToken: string,
  refreshToken: string,
  name: string,
  email: string
): IGetRegSuccess => ({
  type: GET_REG_SUCCESS,
  accessToken,
  refreshToken,
  name,
  email,
});

export const getRegFailedAction = (): IGetRegFailed => ({
  type: GET_REG_FAILED,
});

export const getAuthSuccessAction = (
    accessToken: string,
    refreshToken: string,
    name: string,
    email: string
  ): IGetAuthSuccess => ({
    type: GET_AUTH_SUCCESS,
    accessToken,
    refreshToken,
    name,
    email,
  });

  export const getAuthFailedAction = (): IGetAuthFailed => ({
    type: GET_AUTH_FAILED,
  });

  export const logoutSuccessAction = (
    accessToken: string,
    refreshToken: string,
  ): ILogoutSuccess => ({
    type: LOGOUT_SUCCESS,
    accessToken,
    refreshToken
  });

  export const logoutFailedAction = (): ILogoutFailed => ({
    type: LOGOUT_FAILED,
  });