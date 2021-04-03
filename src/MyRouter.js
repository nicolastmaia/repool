import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import routes from './routes';

const MyRouter = () => {
  const { isLoggedIn, isAdm } = useContext(AuthContext);

  const routing = useRoutes(routes(isLoggedIn, isAdm));

  return <>{routing}</>;
};

export default MyRouter;
