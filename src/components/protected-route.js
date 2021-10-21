import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children, ...rest }) {
  const [user, isLoading] = useAuth();

  if (!isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={() => children} />;
}
