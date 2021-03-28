import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import propriedadeApi from 'src/api/propriedades';

const PropriedadeContext = createContext({
  propriedades: null,
  fetchPropriedades: null,
});

export const PropriedadeProvider = ({ children }) => {
  const [propriedades, setPropriedades] = useState([]);

  const fetchPropriedades = async () => {
    const response = await propriedadeApi.getAll();
    setPropriedades(response);
  };

  return (
    <PropriedadeContext.Provider value={{ propriedades, fetchPropriedades }}>
      {children}
    </PropriedadeContext.Provider>
  );
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeContext;
