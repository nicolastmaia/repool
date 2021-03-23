import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AnuncioContext = createContext({ anuncios: [], favoritos: [] });

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  return (
    <AnuncioContext.Provider value={{ anuncios, favoritos }}>
      {children}
    </AnuncioContext.Provider>
  );
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioContext;
