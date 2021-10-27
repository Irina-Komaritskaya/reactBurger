import { forgotPassword, resetPassword } from '../api';

export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

export const CLEAR_RESET_PASSWORD = 'CLEAR_RESET_PASSWORD';

export function forgotPasswordUser(email) {
  return function (dispatch) {
    const fetchForgot = async () => {
      const res = await forgotPassword(email);
      dispatch({
        type: FORGOT_SUCCESS,
      });
      return res;
    };
    fetchForgot().catch(() =>
      dispatch({
        type: FORGOT_FAILED,
      })
    );
  };
}

export function resetPasswordUser({ password, token }) {
  return function (dispatch) {
    const fetchReset = async () => {
      const res = await resetPassword(password, token);
      dispatch({
        type: RESET_SUCCESS,
      });
      return res;
    };
    fetchReset().catch(() =>
      dispatch({
        type: RESET_FAILED,
      })
    );
  };
}
