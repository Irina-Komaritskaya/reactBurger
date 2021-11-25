import {
    FORGOT_SUCCESS,
    FORGOT_FAILED,
    RESET_SUCCESS,
    RESET_FAILED,
    CLEAR_RESET_PASSWORD,
  } from './constants';

  export interface IForgotSuccess {
    readonly type: typeof FORGOT_SUCCESS;
  }

  export interface IForgotFailed {
    readonly type: typeof FORGOT_FAILED;
  }

  export interface IResetSuccess {
    readonly type: typeof RESET_SUCCESS;
  }

  export interface IResetFailed {
    readonly type: typeof RESET_FAILED;
  }

  export interface IClearResetPassword {
    readonly type: typeof CLEAR_RESET_PASSWORD;
  }

  export type TResetPassword = IForgotSuccess
  | IForgotFailed
  | IResetSuccess
  | IResetFailed
  | IClearResetPassword

  export const ForgotSuccessAction = (): IForgotSuccess => ({
    type: FORGOT_SUCCESS,
  });
  export const ForgotFailedAction = (): IForgotFailed => ({
    type: FORGOT_FAILED,
  });
  export const ResetFailedAction = (): IResetFailed => ({
    type: RESET_FAILED,
  });
  export const ResetSuccessAction = (): IResetSuccess => ({
    type: RESET_SUCCESS,
  });
  export const ClearResetPasswordAction = (): IClearResetPassword => ({
    type: CLEAR_RESET_PASSWORD,
  });