import { 
  registration,
  authorization,
  logOut,
  forgotPassword,
  resetPassword,
  updateProfile
} from './api'


export const GET_REG_SUCCESS= 'GET_REG_SUCCESS';
export const GET_REG_FAILED= 'GET_REG_FAILED';

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

export const CLEAR_RESET_PASSWORD = 'CLEAR_RESET_PASSWORD';

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export const UPDATE_USER = 'UPDATE_USER';


export function registrationUser ({name, email, password}){
  return function (dispatch){
    const fetchReg = async () => { 
      const res = await registration({name, email, password});
      const accessToken = res.accessToken.split(' ')[1];
      dispatch({
        type: GET_REG_SUCCESS,
        value: {accessToken, refreshToken: res.refreshToken, name: res.user.name, email: res.user.email}
      })
      return res;
    }
    fetchReg().catch(() => dispatch({
      type: GET_REG_FAILED
    }));
  }
}

export function authUser ({email, password}){
  return function (dispatch){
    const fetchAuth = async () => { 
      const res = await authorization({email, password});
      const accessToken = res.accessToken.split(' ')[1];
      dispatch({
        type: GET_AUTH_SUCCESS,
        value: {accessToken, refreshToken: res.refreshToken, name: res.user.name, email: res.user.email}
      })
      return res;
    }
    fetchAuth().catch(() => dispatch({
      type: GET_AUTH_FAILED
    }));
  }
}

export function logOutUser (accessToken, refreshToken){
  return function (dispatch){
    const fetchOut = async () => { 
      const res = await logOut(refreshToken);
      dispatch({
        type: LOGOUT_SUCCESS,
        value: {accessToken, refreshToken}
      })
      return res;
    }
    fetchOut().catch(() => dispatch({
      type: LOGOUT_FAILED
    }));
  }
}

export function forgotPasswordUser(email){
  return function (dispatch){
    const fetchForgot = async () => { 
      const res = await forgotPassword(email);
      dispatch({
        type: FORGOT_SUCCESS
      })
      return res;
    }
    fetchForgot().catch(() => dispatch({
      type: FORGOT_FAILED
    }));
  }
}

export function resetPasswordUser({password, token}){
  return function (dispatch){
    const fetchReset = async () => { 
      const res = await resetPassword(password, token);
      dispatch({
        type: RESET_SUCCESS
      })
      return res;
    }
    fetchReset().catch(() => dispatch({
      type: RESET_FAILED
    }));
  }
}

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

