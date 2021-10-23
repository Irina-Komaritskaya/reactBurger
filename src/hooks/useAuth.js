import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookie';
import { RESTORE_USER } from '../services/auth/actions';
import { getUser, getNewAccessToken } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';

export function useAuth() {
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false);

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const user = useSelector((store) => store.auth.user);
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  useEffect(() => {
    //#region func
    const saveUser = async (token) => {
      const res = await getUser(token);
      dispatch({
        type: RESTORE_USER,
        user: res.user,
      });
      setIsLoadedUser(true);
    };

    const getToken = async (token) => {
      const res = await getNewAccessToken(token);
      const newAccessToken = res.accessToken.split(' ')[1];
      setCookie('refreshToken', res.refreshToken);
      setCookie('accessToken', newAccessToken);
      await saveUser(newAccessToken);
    };
    //#endregion

    if (accessToken) {
      if (user) {
        setIsLoadedUser(true);
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

  return [user, isLoadedUser];
}
