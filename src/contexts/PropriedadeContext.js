import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
  const [propriedadeComoInquilino, setPropriedadeComoInquilino] = useState({});
  const { user, userToken, changeUserToken } = useContext(AuthContext);

  const fetchPropriedadesProprias = async () => {
    // TODO alterar pra rota que pega so as propriedades proprias (getAsOwner)
    const response = await propriedadeApi.getAll();
    setPropriedadesProprias(response);
  };

  const fetchPropriedadeComoInquilino = async () => {
    const response = await propriedadeApi.getAsInquilino();
    setPropriedadeComoInquilino(response);
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
