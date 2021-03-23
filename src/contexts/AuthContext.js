import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({ user: {}, userToken: '' });

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
