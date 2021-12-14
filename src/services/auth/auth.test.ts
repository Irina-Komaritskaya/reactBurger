import { authReducer } from './reducers';
import {
  GET_REG_FAILED,
  GET_REG_SUCCESS,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_USER_SUCCESS,
  RESTORE_USER_FAILED,
} from './constants';
import { TInitialState } from '../../types/data';

const defaultAction = {
  name: 'test',
  email: 'test@test.com',
  refreshToken: 'test',
  accessToken: 'test',
};
const defaultState = {
  user: {
    name: 'test',
    email: 'test@test.com',
  },
} as TInitialState;

//#region GET_REG
describe('auth reducer', () => {
  it('should handle registration', () => {
    expect(
      authReducer({} as TInitialState, {
        ...defaultAction,
        type: GET_REG_SUCCESS,
      })
    ).toEqual(defaultState);
    expect(authReducer({} as TInitialState, { type: GET_REG_FAILED })).toEqual(
      {}
    );
    expect(authReducer(defaultState, { type: GET_REG_FAILED })).toEqual(
      defaultState
    );
  });
});
//#endregion

//#region auth
describe('auth reducer', () => {
  it('should handle auth', () => {
    expect(
      authReducer({} as TInitialState, {
        ...defaultAction,
        type: GET_AUTH_SUCCESS,
      })
    ).toEqual(defaultState);
    expect(
      authReducer({} as TInitialState, {
        type: GET_AUTH_FAILED,
      })
    ).toEqual({});
    expect(
      authReducer(defaultState, {
        type: GET_AUTH_FAILED,
      })
    ).toEqual(defaultState);
  });
});
//#endregion

//#region logout
describe('auth reducer', () => {
  it('should handle logout', () => {
    expect(
      authReducer(defaultState, {
        type: LOGOUT_SUCCESS,
        refreshToken: 'test',
        accessToken: 'test',
      })
    ).toEqual({
      user: null,
    });
    expect(
      authReducer({} as TInitialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual({});
    expect(
      authReducer(defaultState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual(defaultState);
  });
});
//#endregion

//#region restoreUser
describe('auth reducer', () => {
  it('should handle restoreUser', () => {
    expect(
      authReducer(defaultState, {   
       user: {
        name: 'test',
        email: 'test',
        password: 'test' 
       },
        type: RESTORE_USER_SUCCESS,
      })
    ).toEqual({user: {
      name: 'test',
      email: 'test',
      password: 'test' 
     }});
    expect(
      authReducer({} as TInitialState, {
        type: RESTORE_USER_FAILED,
      })
    ).toEqual({});
    expect(
      authReducer(defaultState, {
        type: RESTORE_USER_FAILED,
      })
    ).toEqual(defaultState);
  });
});

//#endregion
