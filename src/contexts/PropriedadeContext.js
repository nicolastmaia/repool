import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import propriedadeApi from 'src/api/propriedades';
import { extractComodidades } from 'src/utils/anuncioUtils';

import AuthContext from './AuthContext';

const PropriedadeContext = createContext({
  activePropriedade: null,
  activePropInterests: null,
  propriedadesProprias: null,
  propriedadeComoInquilino: null,
  fetchPropriedadesProprias: null,
  fetchPropriedadeComoInquilino: null,
  fetchInterestedUsers: null,
  fetchActivePropriedade: null,
  savePropriedade: null,
});

export const PropriedadeProvider = ({ children }) => {
  const [propriedadesProprias, setPropriedadesProprias] = useState([]);
  const [propriedadeComoInquilino, setPropriedadeComoInquilino] = useState(
    null
  );
  const [activePropriedade, setActivePropriedade] = useState({});
  const [activePropInterests, setActivePropInterests] = useState([]);
  const { user, userToken, reloadUser, changeUserToken } = useContext(
    AuthContext
  );

  const fetchPropriedadesProprias = async () => {
    try {
      if (user.role !== 'USER') {
        const response = await propriedadeApi.getAsOwner(userToken);
        setPropriedadesProprias(response);
        return 'success';
      }
      setPropriedadesProprias([]);
      return '';
    } catch (error) {
      return 'error';
    }
  };

  const fetchInterestedUsers = async (propertyId) => {
    try {
      const { interests } = await propriedadeApi.getInterests(
        propertyId,
        userToken
      );
      setActivePropInterests(interests);
      return 'success';
    } catch (error) {
      setActivePropInterests([]);
      return 'error';
    }
  };

  const fetchActivePropriedade = async (id) => {
    try {
      const tmpPropriedade = await propriedadeApi.getOne(id, userToken);
      const editedPropriedade = extractComodidades(tmpPropriedade);
      setActivePropriedade(editedPropriedade);
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

  const clearAll = () => {
    setActivePropriedade({});
    setPropriedadeComoInquilino([]);
    setPropriedadesProprias([]);
  };

  useEffect(() => {
    fetchInterestedUsers(activePropriedade.id);
  }, [activePropriedade]);

  useEffect(() => {
    clearAll();
  }, [userToken]);

  return (
    <PropriedadeContext.Provider
      value={{
        activePropriedade,
        activePropInterests,
        propriedadesProprias,
        propriedadeComoInquilino,
        fetchPropriedadesProprias,
        fetchPropriedadeComoInquilino,
        fetchInterestedUsers,
        fetchActivePropriedade,
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
