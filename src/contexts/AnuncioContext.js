/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import {
  checkIfInterest,
  checkIfFavorite,
  extractComodidades,
} from 'src/utils/anuncioUtils';
import anuncioApi from '../api/anuncios';
import AuthContext from './AuthContext';

const AnuncioContext = createContext({
  anuncios: null,
  activeAnuncio: null,
  fetchAnuncios: null,
  fetchFavoritos: null,
  fetchActiveAnuncio: null,
  toggleInterest: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [activeAnuncio, setActiveAnuncio] = useState({});
  const { userToken, user, reloadUser } = useContext(AuthContext);

  const fetchAnuncios = async () => {
    try {
      const returnedAnuncios = await anuncioApi.getAll();
      const auxAnuncios = [];
      for (const anuncio of returnedAnuncios) {
        let editedAnuncio = extractComodidades(anuncio);
        editedAnuncio = checkIfFavorite(anuncio, user);
        auxAnuncios.push(editedAnuncio);
      }
      setAnuncios(auxAnuncios);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchFavoritos = async () => {
    try {
      const returnedFavorites = await anuncioApi.getFavorites(userToken);
      const auxFavorites = [];
      for (const favorite of returnedFavorites) {
        const editedFavorite = extractComodidades(favorite);
        auxFavorites.push(editedFavorite);
      }
      setAnuncios(auxFavorites);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchActiveAnuncio = async (id) => {
    try {
      const tmpAnuncio = await anuncioApi.getOne(id);
      let editedAnuncio = extractComodidades(tmpAnuncio);
      editedAnuncio = checkIfInterest(editedAnuncio, user);
      setActiveAnuncio(editedAnuncio);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const toggleInterest = async () => {
    try {
      if (!activeAnuncio.isInterest) {
        await anuncioApi.createInterest(userToken, activeAnuncio.id);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: true };
        });
      } else {
        await anuncioApi.removeInterest(userToken, activeAnuncio.id);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: false };
        });
      }
      reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  return (
    <AnuncioContext.Provider
      value={{
        anuncios,
        activeAnuncio,
        fetchAnuncios,
        fetchFavoritos,
        fetchActiveAnuncio,
        toggleInterest,
      }}
    >
      {children}
    </AnuncioContext.Provider>
  );
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioContext;
