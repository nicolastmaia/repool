import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PropriedadeContext = createContext({ propriedades: [] });

export const PropriedadeProvider = ({ children }) => {
  const [propriedades, setPropriedades] = useState([]);

  return (
    (
      <PropriedadeContext.Provider value={{ propriedades }}>
        {children}
      </PropriedadeContext.Provider>
    )
  );
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeContext;
