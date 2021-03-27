import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import anuncioApi from '../api/anuncios';

const AnuncioContext = createContext({
  anuncios: null,
  favoritos: null,
  fetchAnuncios: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const fetchAnuncios = async () => {
    const response = await anuncioApi.getAll();
    setAnuncios(response);
  };

  useEffect(() => {
    const filtrarFavoritos = () => {
      const tmpFav = anuncios.filter((anuncio) => anuncio.isFavorite === true);
      setFavoritos(tmpFav);
    };
    filtrarFavoritos();
  }, [anuncios]);

  return (
    <AnuncioContext.Provider value={{ anuncios, favoritos, fetchAnuncios }}>
      {children}
    </AnuncioContext.Provider>
  );
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioContext;
