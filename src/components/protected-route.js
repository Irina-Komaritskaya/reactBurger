import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { UPDATE_USER } from '../services/actions';
import {getUser} from '../services/api'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../services/api';
import { Redirect } from 'react-router';

export function ProtectedRoute({ children, ...rest }) {
  let tokenAccess = getCookie('accessToken');
  let tokenRefresh = getCookie('refreshToken');
  const user = useSelector(store => store.burger.user);
  const dispatch = useDispatch();
  const [loadUser, setLoadUser] = useState(tokenAccess ? true : false);
  const [hasError, setError] = useState(false);

  useEffect(() =>{
    const getToken = async (token) => {
     const res = await refreshToken(token);
     setCookie('refreshToken', res.refreshToken);
     setCookie('accessToken', res.accessToken.split(' ')[1])
    }
    const saveUser = async () => {
      const res = await getUser(getCookie('accessToken'));
      dispatch({
        type: UPDATE_USER,
        user: res.user
      })
      setLoadUser(true);
    }

    if(!tokenAccess && tokenRefresh){
     getToken(tokenRefresh).then(() => {
       saveUser();
       
     }).catch((e) => {
       setError(true);
     });
    } 
    
    if(tokenAccess && !user)
    {
      saveUser().catch(() => {
        setError(true);
      })
    }
  }, [])

  if(!tokenRefresh || hasError === true){
    return <Redirect to='/login'/>;
  }
  if (loadUser === false || !user){
    return null;
  }
 
  return (
    <Route
      {...rest}
      render={() => (
          children
        )
      }
    />
  );
} 