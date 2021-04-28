import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import propriedadeApi from 'src/api/propriedades';
import AuthContext from './AuthContext';

const PropriedadeContext = createContext({
  propriedadesProprias: null,
  propriedadeComoInquilino: null,
  fetchPropriedadesProprias: null,
  fetchPropriedadeComoInquilino: null,
  savePropriedade: null,
});

export const PropriedadeProvider = ({ children }) => {
  const [propriedadesProprias, setPropriedadesProprias] = useState([]);
  const [propriedadeComoInquilino, setPropriedadeComoInquilino] = useState(
    null
  );
  const { user, userToken, reloadUser, changeUserToken } = useContext(
    AuthContext
  );

  const fetchPropriedadesProprias = async () => {
    try {
      const response = await propriedadeApi.getAsOwner(userToken);
      setPropriedadesProprias(response);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchPropriedadeComoInquilino = async () => {
    try {
      const response = await propriedadeApi.getAsInquilino(userToken);
      setPropriedadeComoInquilino(response);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const savePropriedade = async (propriedade, photo) => {
    try {
      if (user.role === 'USER') {
        const [
          newPropriedade,
          newOwnerToken,
        ] = await propriedadeApi.postAsSubscriber(
          propriedade,
          photo,
          userToken
        );
        changeUserToken(newOwnerToken);
      } else {
        await propriedadeApi.postAsOwner(propriedade, photo, userToken);
      }
      reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  return (
    <PropriedadeContext.Provider
      value={{
        propriedadesProprias,
        propriedadeComoInquilino,
        fetchPropriedadesProprias,
        fetchPropriedadeComoInquilino,
        savePropriedade,
      }}
    >
      {children}
    </PropriedadeContext.Provider>
  );
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeContext;
