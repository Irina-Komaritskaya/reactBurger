import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export function RedirectAuthRoute({ children, redirect, ...rest }) {
  const [user, isLoadedUser] = useAuth();

  if (!isLoadedUser) {
    return null;
  }

  if (user) {
    return <Redirect to={redirect} />;
  }

  return <Route {...rest} render={() => children} />;
}