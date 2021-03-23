import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PropriedadeContext = createContext({ propriedades: [] });

const PropriedadeProvider = ({ children }) => {
  const [propriedades, setPropriedades] = useState([]);

  return <PropriedadeContext.Provider>{children}</PropriedadeContext.Provider>;
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeProvider;
