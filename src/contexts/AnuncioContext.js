import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import anuncioApi from '../api/anuncios';

const AnuncioContext = createContext({
  anuncios: null,
  fetchAnuncios: null,
  favoritos: null,
  fetchFavoritos: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

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
    setFavoritos(response);
  };

  return (
    <AnuncioContext.Provider
      value={{ anuncios, fetchAnuncios, favoritos, fetchFavoritos }}
    >
      {children}
    </AnuncioContext.Provider>
  );
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioContext;
