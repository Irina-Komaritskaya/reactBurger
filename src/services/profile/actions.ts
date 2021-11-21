import { AppThunk } from '../../types';
import { TUser } from '../../types/data';
import { updateProfile } from '../api';
import {UdateProfileFailedAction, UdateProfileSuccessAction} from './action-type'


export const updateProfileUser: AppThunk = (value: Partial<TUser>, token: string) => {
  return function (dispatch: any) {
    const fetchUpdateProfile = async () => {
      const res = await updateProfile(value, token);
      dispatch(UdateProfileSuccessAction(res.user));
      return res;
    };
    fetchUpdateProfile().catch(() =>
      dispatch(UdateProfileFailedAction()),

    );
  };
}
