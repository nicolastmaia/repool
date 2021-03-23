import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  user: null,
  userToken: null,
  isLoggedIn: null,
  isAdm: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isLoggedIn] = useState(userToken);
  const [isAdm, setIsAdm] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        isLoggedIn: !!userToken,
        isAdm,
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
