import React, { useContext, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import {
  admLoggedInRoutes,
  loggedOutRoutes,
  simpleLoggedInRoutes,
} from './routes';

const SimpleRouter = () => {
  const routing = useRoutes(simpleLoggedInRoutes);
  return routing;
};

const AdmRouter = () => {
  const routing = useRoutes(admLoggedInRoutes);
  return routing;
};

const LoggedOutRouter = () => {
  const routing = useRoutes(loggedOutRoutes);
  return routing;
};

const MyRouter = () => {
  const { isLoggedIn, isAdm } = useContext(AuthContext);

  if (isLoggedIn) {
    if (isAdm) {
      return <AdmRouter />;
    }
    return <SimpleRouter />;
  }
  return <LoggedOutRouter />;
};

export default MyRouter;
