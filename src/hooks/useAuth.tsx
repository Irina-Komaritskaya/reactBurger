import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookie';
import { restoreUser } from '../services/auth/actions';
import { getNewAccessToken } from '../services/api';
import { useDispatch, useSelector } from '../types/hooks';

export function useAuth() {
  const dispatch = useDispatch();
  const [hasError, setError] = useState<boolean>(false);

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const user = useSelector(store => store.auth.user);
  const [isLoadedUser, setIsLoadedUser] = useState<boolean>(false);

  useEffect(() => {
    //#region func
    const saveUser = async (token: string) => {
      return dispatch(restoreUser(token));
    };
    const getToken = async (token: string) => {
      const res = await getNewAccessToken(token);
      const newAccessToken = res.accessToken.split(' ')[1];
      setCookie('refreshToken', res.refreshToken);
      setCookie('accessToken', newAccessToken);
      await saveUser(newAccessToken);
      setIsLoadedUser(true);
    };
    //#endregion

    if (accessToken) {
      if (user) {
        setIsLoadedUser(true);
      } else {
        saveUser(accessToken)
          .then(() => setIsLoadedUser(true))
          .catch(() => setError(true));
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
