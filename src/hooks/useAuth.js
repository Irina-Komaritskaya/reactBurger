import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookie';
import { UPDATE_USER } from '../services/actions'
import { getUser,  getNewAccessToken } from '../services/api'
import { useDispatch, useSelector } from 'react-redux';

export function useAuth() {
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false);

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const user = useSelector(store => store.burger.user);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  
  useEffect(() =>{
    //#region func
    const saveUser = async (token) => {
      const res = await getUser(token);
      dispatch({
        type: UPDATE_USER,
        user: res.user
      })
      setIsLoadingUser(true);
    }

    const getToken = async (token) => {
      const res = await getNewAccessToken(token);
      const newAccessToken = res.accessToken.split(' ')[1];
      setCookie('refreshToken', res.refreshToken);
      setCookie('accessToken', newAccessToken);
      await saveUser(newAccessToken);
    }
    //#endregion 

    if (accessToken) {
      if (user) {
        setIsLoadingUser(true);
      } else {
        saveUser(accessToken).catch(() => setError(true));
      }
    } else if (refreshToken) {
      getToken(refreshToken).catch(() => setError(true));
    }
  }, [accessToken, dispatch, refreshToken, user]);

  if (!refreshToken || hasError) {
    return [null, true];
  }

  return [user, isLoadingUser];
}