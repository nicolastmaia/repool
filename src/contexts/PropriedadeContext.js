import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import propriedadeApi from 'src/api/propriedades';

const PropriedadeContext = createContext({
  propriedadesProprias: null,
  propriedadeComoInquilino: null,
  fetchPropriedadesProprias: null,
  fetchPropriedadeComoInquilino: null,
});

export const PropriedadeProvider = ({ children }) => {
  const [propriedadesProprias, setPropriedadesProprias] = useState([]);
  const [propriedadeComoInquilino, setPropriedadeComoInquilino] = useState({});

  const fetchPropriedadesProprias = async () => {
    // TODO alterar pra rota que pega so as propriedades proprias (getAsOwner)
    const response = await propriedadeApi.getAll();
    setPropriedadesProprias(response);
  };

  const fetchPropriedadeComoInquilino = async () => {
    const response = await propriedadeApi.getAsInquilino();
    setPropriedadeComoInquilino(response);
  };

  return (
    <PropriedadeContext.Provider
      value={{
        propriedadesProprias,
        propriedadeComoInquilino,
        fetchPropriedadesProprias,
        fetchPropriedadeComoInquilino,
      }}
    >
      {children}
    </PropriedadeContext.Provider>
  );
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeContext;
