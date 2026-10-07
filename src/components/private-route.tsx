import {Navigate} from 'react-router-dom';
import {JSX} from 'react';
import {AppRoute, AuthorizationStatus} from '../const.ts';

type AuthorizationStatusKey = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusKey;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
