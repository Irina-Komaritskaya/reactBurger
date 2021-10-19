import { 
  updateProfile
} from '../api'

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export function updateProfileUser(value, token){
  return function (dispatch){
    const fetchUpdateProfile = async () => { 
      const res = await updateProfile(value, token);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        user: res.user
      })
      return res;
    }
    fetchUpdateProfile().catch(() => dispatch({
      type: UPDATE_PROFILE_FAILED
    }));
  }
}

