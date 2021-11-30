import { profileReducer } from '../../services/profile/reducers';
import {
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
} from '../../services/profile/constants';
import { TInitialState } from '../../types/data';

//#region confirm order
describe('profile reducer', () => {
  it('should handle updateProfile', () => {
    expect(
      profileReducer({} as TInitialState, {
        type: UPDATE_PROFILE_SUCCESS,
        user: { name: 'test', email: 'test' },
      })
    ).toEqual({
      user: { name: 'test', email: 'test' },
    });
    expect(
      profileReducer(
        { user: { name: 'testTest', email: 'testTest' } } as TInitialState,
        {
          type: UPDATE_PROFILE_SUCCESS,
          user: { name: 'test', email: 'test' },
        }
      )
    ).toEqual({
      user: { name: 'test', email: 'test' },
    });
    expect(
      profileReducer({} as TInitialState, {
        type: UPDATE_PROFILE_FAILED,
      })
    ).toEqual({});
    expect(
      profileReducer(
        { user: { name: 'test', email: 'test' } } as TInitialState,
        {
          type: UPDATE_PROFILE_FAILED,
        }
      )
    ).toEqual({ user: { name: 'test', email: 'test' } });
  });
});
//#endregion
