import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from 'src/api/users';

const AuthContext = createContext({
  user: null,
  userToken: null,
  isAdm: null,
  signup: null,
  login: null,
  logout: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isAdm, setIsAdm] = useState(false);
  const navigate = useNavigate();

  const login = async (userCreds) => {
    const [authUser, jwtToken] = await userApi.login(userCreds);
    setUser(authUser);
    setUserToken(jwtToken);
  };

  const signup = async (newUser) => {
    const [authUser, jwtToken] = await userApi.signup(newUser);
    navigate('/');
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
