import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import ConfirmDialog from 'src/components/ConfirmDialog';
import Page from 'src/components/Page';
import AnuncioContext from 'src/contexts/AnuncioContext';
import AnuncioCard from './AnuncioCard';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  anuncioCard: {
    height: '100%',
  },
}));

const AnuncioList = () => {
  const classes = useStyles();
  const { anuncios, favoritos, fetchAnuncios, fetchFavoritos } = useContext(
    AnuncioContext
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  let { pathname } = window.location;

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  useEffect(() => {
    pathname = pathname.slice(1);
    if (pathname === 'anuncios') {
      fetchAnuncios();
    } else if (pathname === 'favoritos') {
      fetchFavoritos();
    }
  }, [pathname]);

  return (
    <Page className={classes.root} title='Anuncios'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {anuncios.map((anuncio) => (
              <Grid item key={anuncio.id} lg={4} md={6} xs={12}>
                <AnuncioCard
                  openConfirmDialog={openConfirmDialog}
                  className={classes.anuncioCard}
                  anuncio={anuncio}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={1} size='small' />
          {/* TODO quantidade de páginas de anúncios aqui em cima.
          precisa variar com a quantidade de itens que teremos em cada página */}
        </Box>
        <ConfirmDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          closeConfirmDialog={closeConfirmDialog}
        />
      </Container>
    </Page>
  );
};

AnuncioList.propTypes = {};

export default AnuncioList;
