import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

interface IRedirectAuthRoute {
  redirect: string;
}
export const RedirectAuthRoute: React.FC<IRedirectAuthRoute & Record<string,any>> = ({
  children,
  redirect,
  ...rest
}) => {
  const [user, isLoadedUser] = useAuth();

  if (!isLoadedUser) {
    return null;
  }

  if (user) {
    return <Redirect to={redirect} />;
  }

  return <Route {...rest} render={() => children} />;
};
