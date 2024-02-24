import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import adminApi from 'src/api/admin';
import AuthContext from './AuthContext';

const AdminContext = createContext({
  usersBySex: null,
  propsByState: null,
  activePropsByState: null,
  getQtdUsersBySex: null,
  getQtdPropsByState: null,
});

export const AdminProvider = ({ children }) => {
  const [usersBySex, setUsersBySex] = useState(null);
  const [propsByState, setPropsByState] = useState(null);
  const [activePropsByState, setActivePropsByState] = useState(null);
  const { user, userToken } = useContext(AuthContext);

  const getQtdUsersBySex = async () => {
    try {
      const usersQtd = await adminApi.getQtdUsersBySex(userToken);
      setUsersBySex(usersQtd);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const getQtdPropsByState = async () => {
    try {
      const propsQtd = await adminApi.getQtdPropsByState(userToken);
      setPropsByState(propsQtd);
      const activePropsQtd = await adminApi.getQtdActivePropsByState(userToken);
      setActivePropsByState(activePropsQtd);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  return (
    <AdminContext.Provider
      value={{ usersBySex, propsByState, activePropsByState, getQtdUsersBySex, getQtdPropsByState }}
    >
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContext;
