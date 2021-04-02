import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import ConfirmDialog from 'src/components/ConfirmDialog';
import AnuncioContext from 'src/contexts/AnuncioContext';
import Toolbar from './Toolbar';
import FavoritoCard from './FavoritoCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  favoritoCard: {
    height: '100%',
  },
}));

const FavoritoList = () => {
  const classes = useStyles();
  const { favoritos, fetchFavoritos } = useContext(AnuncioContext);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <Page className={classes.root} title='Favoritos'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {favoritos.map((favorito) => (
              <Grid item key={favorito.id} lg={4} md={6} xs={12}>
                <FavoritoCard
                  openConfirmDialog={openConfirmDialog}
                  className={classes.favoritoCard}
                  favorito={favorito}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={1} size='small' />
          {/* TODO quantidade de páginas de anúncios aqui em cima.
          Precisa variar com a quantidade de itens que teremos em cada página */}
        </Box>
        <ConfirmDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          closeConfirmDialog={closeConfirmDialog}
        />
      </Container>
    </Page>
  );
};

export default FavoritoList;
