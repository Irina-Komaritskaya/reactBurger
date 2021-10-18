import {getIngredients, getOrder, registration, authorization, logOut, forgotPassword, resetPassword, updateProfile, refreshToken} from './api'
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';
export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const DEL_CURRENT_INGREDIENT ='DEL_CURRENT_INGREDIENT';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CONFIRM_ORDER ='CONFIRM_ORDER';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DEL_COMPONENT ='DEL_PRICE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

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

export const GET_USER_FROM_COOKIES = 'GET_USER_FROM_COOKIES';

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export const UPDATE_USER = 'UPDATE_USER';

export function loadIngredients(){
  return function(dispatch){
    const fetchIngredients = async () => {
      const res = await getIngredients();
      dispatch({
        type: GET_INGREDIENT_SUCCESS,
        value: res.data
      })
      return res;
    }
    dispatch({
      type: GET_INGREDIENT_REQUEST
    })
    fetchIngredients().catch(() => {
      dispatch({
        type: GET_INGREDIENT_FAILED
      })
    })
  }
};

export function loadOrder(idIngredients, idBun){
  return function(dispatch){
    const fetchOrder = async () => {
      const res = await getOrder(idIngredients, idBun);
      dispatch({
        type: GET_ORDER_SUCCESS,
        value: {order: res.order, idIngredients, idBun }
      })
      return res;
    }
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetchOrder().catch(() => { dispatch({
      type: GET_ORDER_FAILED
    })})
  }
}

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

