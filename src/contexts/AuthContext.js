import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import userApi from 'src/api/users';
import { RepeatOne } from '@material-ui/icons';
import axios from '../api/base';

const AuthContext = createContext({
  user: null,
  userToken: null,
  isLoggedIn: null,
  isAdm: null,
  login: null,
  logout: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isLoggedIn] = useState(userToken);
  const [isAdm, setIsAdm] = useState(false);

  const login = async () => {
    const response = await userApi.getOne(1);
    response.avatar =
      'https://www.flaticon.com/svg/vstatic/svg/147/147144.svg?token=exp=1616682918~hmac=d2798b19f5384169f6835f209e37b7f7';
    setUser(response);
    setUserToken('asdadasasd');
  };

  const logout = () => {
    setUser({});
    setUserToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        isLoggedIn: !!userToken,
        isAdm,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
