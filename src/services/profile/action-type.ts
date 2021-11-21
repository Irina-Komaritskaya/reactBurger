import { TUser } from '../../types/types';
import { UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from './constants';

export interface IUdateProfileFailed {
  readonly type: typeof UPDATE_PROFILE_FAILED;
}

export interface IUdateProfileSuccess {
  readonly type: typeof UPDATE_PROFILE_SUCCESS,
  user: Partial<TUser>;
}

export type TProfile = IUdateProfileFailed | IUdateProfileSuccess

export const UdateProfileFailedAction = (): IUdateProfileFailed => ({
    type: UPDATE_PROFILE_FAILED,
  });

  export const UdateProfileSuccessAction = (user: Partial<TUser>): IUdateProfileSuccess => ({
    type: UPDATE_PROFILE_SUCCESS,
    user
  });