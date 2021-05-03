import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import routes from './routes';

const MyRouter = () => {
  const { userToken, user } = useContext(AuthContext);

  const routing = useRoutes(routes(userToken, user.role));

  return <>{routing}</>;
};

export default MyRouter;
