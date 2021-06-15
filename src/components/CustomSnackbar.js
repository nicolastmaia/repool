import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

function CustomSnackbar({ message, handleCloseSnackbar }) {
  const renderAlert = () => {
    if (message === 'success') {
      return (
        <>
          <AlertTitle>Sucesso!!</AlertTitle> Ação realizada com sucesso!
        </>
      );
    }
    if (message === 'error') {
      return (
        <>
          <AlertTitle>Erro</AlertTitle> Tente novamente, por favor.
        </>
      );
    }
    if (message === 'warning') {
      return (
        <>
          <AlertTitle>Aviso</AlertTitle> Ação parcialmente realizada.
        </>
      );
    }
    return <></>;
  };

  return (
    <Snackbar open={message} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert severity={message}>{renderAlert()}</Alert>
    </Snackbar>
  );
}

CustomSnackbar.propTypes = {
  message: PropTypes.string,
  handleCloseSnackbar: PropTypes.func,
};

export default CustomSnackbar;
