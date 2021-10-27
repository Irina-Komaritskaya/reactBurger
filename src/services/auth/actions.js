import { registration, authorization, logOut } from '../api';

export const GET_REG_SUCCESS = 'GET_REG_SUCCESS';
export const GET_REG_FAILED = 'GET_REG_FAILED';

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const RESTORE_USER = 'RESTORE_USER';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function registrationUser({ name, email, password }) {
  return function (dispatch) {
    const fetchReg = async () => {
      const res = await registration({ name, email, password });
      const accessToken = res.accessToken.split(' ')[1];
      dispatch({
        type: GET_REG_SUCCESS,
        value: {
          accessToken,
          refreshToken: res.refreshToken,
          name: res.user.name,
          email: res.user.email,
        },
      });
      return res;
    };
    fetchReg().catch(() =>
      dispatch({
        type: GET_REG_FAILED,
      })
    );
  };
}

export function authUser({ email, password }) {
  return function (dispatch) {
    const fetchAuth = async () => {
      const res = await authorization({ email, password });
      const accessToken = res.accessToken.split(' ')[1];
      dispatch({
        type: GET_AUTH_SUCCESS,
        value: {
          accessToken,
          refreshToken: res.refreshToken,
          name: res.user.name,
          email: res.user.email,
        },
      });
      return res;
    };
    fetchAuth().catch(() =>
      dispatch({
        type: GET_AUTH_FAILED,
      })
    );
  };
}

export function logOutUser(accessToken, refreshToken) {
  return function (dispatch) {
    const fetchOut = async () => {
      const res = await logOut(refreshToken);
      dispatch({
        type: LOGOUT_SUCCESS,
        value: { accessToken, refreshToken },
      });
      return res;
    };
    fetchOut().catch(() =>
      dispatch({
        type: LOGOUT_FAILED,
      })
    );
  };
}
