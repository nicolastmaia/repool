/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  checkIfFavorite,
  checkIfInterest,
  checkIfMyProperty,
  checkIfActiveRent,
  extractComodidades,
} from 'src/utils/anuncioUtils';
import anuncioApi from '../api/anuncios';
import AuthContext from './AuthContext';

const AnuncioContext = createContext({
  anuncios: null,
  activeAnuncio: null,
  countTotalAds: null,
  fetchAnuncios: null,
  searchAnunciosByText: null,
  fetchActiveAnuncio: null,
  toggleInterest: null,
  toggleFavorite: null,
  loadFavorites: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [activeAnuncio, setActiveAnuncio] = useState({});
  const { userToken, user, reloadUser, favorites, fetchFavorites } = useContext(AuthContext);
  const [countTotalAds, setCountTotalAds] = useState(0);

  const fetchAnuncios = async (offset) => {
    try {
      const returnedAnuncios = await anuncioApi.getAll(offset);
      const auxTotalAds = await anuncioApi.getNumberOfAds();
      const auxAnuncios = [];
      returnedAnuncios.forEach((anuncio) => {
        let editedAnuncio = extractComodidades(anuncio);
        editedAnuncio = checkIfMyProperty(editedAnuncio, user.property);
        editedAnuncio = checkIfFavorite(editedAnuncio, favorites);
        auxAnuncios.push(editedAnuncio);
      });
      setAnuncios(auxAnuncios);
      setCountTotalAds(auxTotalAds);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const searchAnunciosByText = async (text, offset) => {
    try {
      const returnedAnuncios = await anuncioApi.getByText(text, offset);
      const auxTotalAds = await anuncioApi.getNumberOfAds();
      const auxAnuncios = [];
      returnedAnuncios.forEach((anuncio) => {
        let editedAnuncio = extractComodidades(anuncio);
        editedAnuncio = checkIfMyProperty(editedAnuncio, user.property);
        editedAnuncio = checkIfFavorite(editedAnuncio, favorites);
        auxAnuncios.push(editedAnuncio);
      });
      setAnuncios(auxAnuncios);
      setCountTotalAds(auxTotalAds);
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
      editedAnuncio = checkIfActiveRent(editedAnuncio, user);
      editedAnuncio = checkIfFavorite(editedAnuncio, favorites);
      setActiveAnuncio(editedAnuncio);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const toggleFavorite = async (anuncioId) => {
    try {
      await anuncioApi.toggleFavorite(userToken, anuncioId);
      await fetchFavorites();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const toggleInterest = async (anuncioId) => {
    try {
      if (!activeAnuncio.isInterest) {
        await anuncioApi.createInterest(userToken, anuncioId);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: true };
        });
      } else {
        await anuncioApi.removeInterest(userToken, anuncioId);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: false, interest: null };
        });
      }
      reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const loadFavorites = () => {
    const auxAnuncios = [];
    favorites.forEach((anuncio) => {
      let editedAnuncio = extractComodidades(anuncio);
      editedAnuncio = checkIfFavorite(editedAnuncio, favorites);
      auxAnuncios.push(editedAnuncio);
    });

    setAnuncios(auxAnuncios);
  };

  const clearAll = () => {
    setActiveAnuncio({});
    setAnuncios([]);
  };

  useEffect(() => {
    clearAll();
  }, [userToken]);

  useEffect(() => {
    reloadUser();
  }, [anuncios]);

  return (
    <AnuncioContext.Provider
      value={{
        anuncios,
        activeAnuncio,
        countTotalAds,
        fetchAnuncios,
        searchAnunciosByText,
        fetchActiveAnuncio,
        toggleInterest,
        toggleFavorite,
        loadFavorites,
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
