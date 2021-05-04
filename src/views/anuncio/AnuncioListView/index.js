import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import ConfirmDialog from 'src/components/ConfirmDialog';
import CustomSnackbar from 'src/components/CustomSnackbar';
import Page from 'src/components/Page';
import AnuncioContext from 'src/contexts/AnuncioContext';
import AuthContext from 'src/contexts/AuthContext';
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
  const { anuncios, fetchAnuncios, loadFavorites } = useContext(AnuncioContext);
  const { favorites } = useContext(AuthContext);
  const [offset, setOffset] = useState(1);
  const [pageNumber, setPageNumber] = useState(2);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  let { pathname } = window.location;

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  const handlePageChange = (event, value) => {
    setOffset((value - 1) * 20);
    setPageNumber(value + 1);
  };

  useEffect(() => {
    const fetchAllAnuncios = async () => {
      pathname = pathname.slice(1);
      let message;
      if (pathname === 'anuncios') {
        message = await fetchAnuncios(offset);
      } else if (pathname === 'favoritos') {
        message = loadFavorites();
      }
      setSnackbarMessage(message);
    };
    fetchAllAnuncios();
  }, [pathname, favorites, offset]);

  return (
    <Page className={classes.root} title='Anuncios'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {anuncios &&
              anuncios.map((anuncio) => (
                <Grid item key={anuncio.id} lg={3} md={4} sm={6} xs={12}>
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
          <Pagination color='primary' count={pageNumber} size='small' onChange={handlePageChange} />
        </Box>
        <ConfirmDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          closeConfirmDialog={closeConfirmDialog}
        />
        <CustomSnackbar message={snackbarMessage} handleCloseSnackbar={handleCloseSnackbar} />
      </Container>
    </Page>
  );
};

AnuncioList.propTypes = {};

export default AnuncioList;
