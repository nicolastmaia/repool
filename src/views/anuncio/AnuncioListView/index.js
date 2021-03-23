import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import ConfirmDialog from 'src/components/ConfirmDialog';
import AnuncioContext from 'src/contexts/AnuncioContext';
import Toolbar from './Toolbar';
import AnuncioCard from './AnuncioCard';

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
  const { anuncios, fetchAnuncios } = useContext(AnuncioContext);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  useEffect(() => {
    fetchAnuncios();
  }, []);

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
          {/* quantidade de páginas de anúncios aqui em cima.
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

export default AnuncioList;
