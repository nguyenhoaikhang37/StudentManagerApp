import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps {}

const isLoggedIn = Boolean(localStorage.getItem('access_token'));
export const PrivateRoute = (props: RouteProps) => {
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
};
