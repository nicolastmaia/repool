import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import userApi from 'src/api/users';

const AuthContext = createContext({
  user: null,
  userToken: null,
  isLoggedIn: null,
  isAdm: null,
  signup: null,
  login: null,
  logout: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isLoggedIn] = useState(userToken);
  const [isAdm, setIsAdm] = useState(false);

  const login = async (userCreds) => {
    const jwtToken = await userApi.login(userCreds);
    const authUser = await userApi.getUserByToken(jwtToken);
    setUser(authUser);
    setUserToken(jwtToken);
  };

  const signup = async (newUser) => {
    const [authUser, jwtToken] = await userApi.signup(newUser);
    setUser(authUser);
    setUserToken(jwtToken);
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
        signup,
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
