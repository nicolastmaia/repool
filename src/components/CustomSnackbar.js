import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import PropTypes from 'prop-types';

function CustomSnackbar({ message, handleCloseSnackbar }) {
  const renderAlert = () => {
    if (message === 'success') {
      return (
        <>
          <AlertTitle>Sucesso!!</AlertTitle> Propriedade criada com sucesso!
        </>
      );
    }
    if (message === 'error') {
      return (
        <>
          <AlertTitle>Erro</AlertTitle> Houve um erro na criação da propriedade.
          Tente novamente
        </>
      );
    }
    return <></>;
  };

  return (
    <Snackbar
      open={message}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert severity={message}>{renderAlert()}</Alert>
    </Snackbar>
  );
}

CustomSnackbar.propTypes = {
  message: PropTypes.string,
  handleCloseSnackbar: PropTypes.func,
};

export default CustomSnackbar;
