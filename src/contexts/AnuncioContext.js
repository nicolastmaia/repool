import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { extractComodidades } from 'src/utils/anuncioUtils';
import anuncioApi from '../api/anuncios';

const AnuncioContext = createContext({
  anuncios: null,
  activeAnuncio: null,
  fetchAnuncios: null,
  fetchFavoritos: null,
  setActive: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [activeAnuncio, setActiveAnuncio] = useState({});

  const fetchAnuncios = async () => {
    try {
      const tmpAnuncios = await anuncioApi.getAll();
      extractComodidades(tmpAnuncios);
      setAnuncios(tmpAnuncios);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchFavoritos = async () => {
    const response = await anuncioApi.getFavorites();
    setAnuncios(response);
  };

  const setActive = (anuncio) => {
    setActiveAnuncio(anuncio);
  };

  return (
    <AnuncioContext.Provider
      value={{
        anuncios,
        activeAnuncio,
        fetchAnuncios,
        fetchFavoritos,
        setActive,
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
