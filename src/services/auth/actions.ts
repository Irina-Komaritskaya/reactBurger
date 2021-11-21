import { AppDispatch, AppThunk } from '../../types';
import { TUser } from '../../types/data';
import { registration, authorization, logOut, getUser } from '../api';
import {
  getRegSuccessAction,
  getRegFailedAction,
  getAuthSuccessAction,
  getAuthFailedAction,
  logoutSuccessAction,
  logoutFailedAction,
  RestoreUserSuccessAction,
  RestoreUserFailedAction,
} from './action-type';

export const registrationUser: AppThunk = ({ name, email, password }: TUser) => {
  return function (dispatch: AppDispatch) {
    const fetchReg = async () => {
      const res = await registration({ name, email, password });
      const accessToken = res.accessToken.split(' ')[1];
      dispatch(
        getRegSuccessAction(
          accessToken,
          res.refreshToken,
          res.user.name,
          res.user.email
        )
      );
      return res;
    };
    fetchReg().catch(() => dispatch(getRegFailedAction()));
  };
}

export function authUser({
  email,
  password,
}: Pick<TUser, 'email' | 'password'>) {
  return function (dispatch: any) {
    const fetchAuth = async () => {
      const res = await authorization({ email, password });
      const accessToken = res.accessToken.split(' ')[1];
      dispatch(
        getAuthSuccessAction(
          accessToken,
          res.refreshToken,
          res.user.name,
          res.user.email
        )
      );
      return res;
    };
    fetchAuth().catch(() => dispatch(getAuthFailedAction()));
  };
}

export function logOutUser(accessToken: string, refreshToken: string) {
  return function (dispatch: any) {
    const fetchOut = async () => {
      const res = await logOut(refreshToken);
      dispatch(logoutSuccessAction(accessToken, refreshToken));
      return res;
    };
    fetchOut().catch(() =>
      dispatch(logoutFailedAction())
    );
  };
}

export function restoreUser(accessToken: string) {
  return function (dispatch: any) {
    const fetchRestore = async () => {
      const res = await getUser(accessToken);
      dispatch(RestoreUserSuccessAction(res.user));
      return res;
    };
    return fetchRestore().catch(() =>
      dispatch(RestoreUserFailedAction())
    );
  };
}