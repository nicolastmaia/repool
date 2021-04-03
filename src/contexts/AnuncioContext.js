import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
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
    const response = await anuncioApi.getAll();
    /* TODO precisa fazer algo do tipo pros icones de comodidades aparecerem no card de anuncio
    response[0].comodidades = [
      { nome: 'wifi' },
      { nome: 'pet' },
      { nome: 'gourmet' },
    ]; */
    setAnuncios(response);
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
