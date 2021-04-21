/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { extractComodidades } from 'src/utils/anuncioUtils';
import anuncioApi from '../api/anuncios';

const AnuncioContext = createContext({
  anuncios: null,
  activeAnuncio: null,
  fetchAnuncios: null,
  fetchFavoritos: null,
  fetchActiveAnuncio: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [activeAnuncio, setActiveAnuncio] = useState({});

  const fetchAnuncios = async () => {
    try {
      const returnedAnuncios = await anuncioApi.getAll();
      const auxAnuncios = [];
      for (const anuncio of returnedAnuncios) {
        const editedAnuncio = extractComodidades(anuncio);
        auxAnuncios.push(editedAnuncio);
      }
      setAnuncios(auxAnuncios);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchFavoritos = async () => {
    const response = await anuncioApi.getFavorites();
    setAnuncios(response);
  };

  const fetchActiveAnuncio = async (id) => {
    try {
      const tmpAnuncio = await anuncioApi.getOne(id);
      const editedAnuncio = extractComodidades(tmpAnuncio);
      setActiveAnuncio(editedAnuncio);
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
