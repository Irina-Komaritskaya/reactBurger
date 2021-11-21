import { forgotPassword, resetPassword } from '../api';
import {
  ForgotSuccessAction,
  ForgotFailedAction,
  ResetFailedAction,
  ResetSuccessAction,
} from './action-type';
export function forgotPasswordUser(email: string) {
  return function (dispatch: any) {
    const fetchForgot = async () => {
      const res = await forgotPassword(email);
      dispatch(ForgotSuccessAction());
      return res;
    };
    fetchForgot().catch(() => dispatch(ForgotFailedAction()));
  };
}

interface IResetPasswordUserParams {
  password: string;
  token: string;
}
export function resetPasswordUser({
  password,
  token,
}: IResetPasswordUserParams) {
  return function (dispatch: any) {
    const fetchReset = async () => {
      const res = await resetPassword(password, token);
      dispatch(ResetSuccessAction());
      return res;
    };
    fetchReset().catch(() => dispatch(ResetFailedAction()));
  };
}
