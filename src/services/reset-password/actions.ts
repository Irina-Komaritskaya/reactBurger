import { AppDispatch, AppThunk } from '../../types';
import { forgotPassword, resetPassword } from '../api';
import {
  ForgotSuccessAction,
  ForgotFailedAction,
  ResetFailedAction,
  ResetSuccessAction,
} from './action-type';

export const forgotPasswordUser: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    const fetchForgot = async () => {
      const res = await forgotPassword(email);
      dispatch(ForgotSuccessAction());
      return res;
    };
    fetchForgot().catch(() => dispatch(ForgotFailedAction()));
  };
};

interface IResetPasswordUserParams {
  password: string;
  token: string;
}
export const resetPasswordUser: AppThunk = ({
  password,
  token,
}: IResetPasswordUserParams) => {
  return function (dispatch: AppDispatch) {
    const fetchReset = async () => {
      const res = await resetPassword(password, token);
      dispatch(ResetSuccessAction());
      return res;
    };
    fetchReset().catch(() => dispatch(ResetFailedAction()));
  };
};
