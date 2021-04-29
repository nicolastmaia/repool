import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import { Divide } from 'react-feather';
import CustomSnackbar from 'src/components/CustomSnackbar';
import Toolbar from './Toolbar';
import PropriedadeCard from './PropriedadeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  propriedadeCard: {
    height: '100%',
  },
  minhasPropriedades: {
    marginTop: '1em',
  },
}));

const PropriedadeList = () => {
  const classes = useStyles();
  const {
    propriedadesProprias,
    fetchPropriedadesProprias,
    propriedadeComoInquilino,
    fetchPropriedadeComoInquilino,
  } = useContext(PropriedadeContext);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { pathname } = window.location;

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  useEffect(() => {
    fetchPropriedadesProprias();
    // TODO adicionar essa rota depois que estiver funcionando
    // fetchPropriedadeComoInquilino();
  }, [pathname]);

  return (
    <Page className={classes.root} title='Propriedades'>
      <Container maxWidth={false}>
        <Toolbar />
        <Typography className={classes.minhasPropriedades} variant='h1'>
          Minhas Propriedades
        </Typography>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={1} size='small' />
          {/* TODO quantidade de páginas de anúncios aqui em cima.
          precisa variar com a quantidade de itens que teremos em cada página */}
        </Box>

        <Box mt={3} mb={3}>
          <Grid container spacing={3}>
            {propriedadesProprias &&
              propriedadesProprias.map((propriedade) => (
                <Grid item key={propriedade.id} lg={3} md={4} sm={6} xs={12}>
                  <PropriedadeCard
                    className={classes.propriedadeCard}
                    propriedade={propriedade}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>

        <Divider />

        <Typography className={classes.minhasPropriedades} variant='h1'>
          Onde Moro
        </Typography>
        <Box mt={3} mb={3}>
          <Grid container spacing={3}>
            {/* TODO mudar as linhas abaixo quando tiver uma rota de
            propriedadesProprias onde moro */}
            <Grid item>
              {propriedadeComoInquilino ? (
                <PropriedadeCard
                  className={classes.propriedadeCard}
                  propriedade={propriedadeComoInquilino}
                />
              ) : (
                <Typography className={classes.minhasPropriedades} variant='h3'>
                  Você ainda não mora em nenhuma propriedade cadastrada em nosso
                  sistema.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <CustomSnackbar
          message={snackbarMessage}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      </Container>
    </Page>
  );
};

export default PropriedadeList;
