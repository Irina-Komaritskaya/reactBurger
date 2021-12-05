import { passwordReducer } from '../../services/reset-password/reducers';
import {
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_SUCCESS,
  RESET_FAILED,
  CLEAR_RESET_PASSWORD,
} from '../../services/reset-password/constants';
import { TInitialState } from '../../types/data';

describe('password reducer', () => {
  it('should handle forgot password', () => {
    expect(
      passwordReducer({} as TInitialState, {
        type: FORGOT_SUCCESS,
      })
    ).toEqual({
      isRecoverEmail: true,
    });
    expect(
      passwordReducer({ isRecoverEmail: false } as TInitialState, {
        type: FORGOT_FAILED,
      })
    ).toEqual({
      isRecoverEmail: false,
    });
  });
});

describe('password reducer', () => {
  it('should handle reset password', () => {
    expect(
      passwordReducer({} as TInitialState, {
        type: RESET_SUCCESS,
      })
    ).toEqual({
      isRecoverEmail: false,
      isResetPassword: true,
    });
    expect(
      passwordReducer({isResetPassword: false} as TInitialState, {
        type: RESET_FAILED,
      })
    ).toEqual({isResetPassword: false});
    expect(
      passwordReducer({ isResetPassword: true } as TInitialState, {
        type: CLEAR_RESET_PASSWORD,
      })
    ).toEqual({ isResetPassword: false });
  });
});
