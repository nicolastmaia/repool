import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const AnuncioContext = createContext({ anuncios: [], favoritos: [] });

const AnuncioProvider = ({ children }) => {
  return <AnuncioContext.Provider>{children}</AnuncioContext.Provider>;
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioProvider;
