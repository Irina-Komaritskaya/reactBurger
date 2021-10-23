import { Route, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ children, ...rest }) {
  const [user, isLoadedUser] = useAuth();
  const location = useLocation();

  if (!isLoadedUser) {
    return null;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest} render={() => children} />;
}
