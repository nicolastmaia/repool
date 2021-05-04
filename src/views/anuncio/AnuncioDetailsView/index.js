/* eslint-disable no-nested-ternary */
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HandIcon from '@material-ui/icons/PanTool';
import StarIcon from '@material-ui/icons/StarRate';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import CustomSnackbar from 'src/components/CustomSnackbar';
import AnuncioContext from 'src/contexts/AnuncioContext';
import AuthContext from 'src/contexts/AuthContext';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import AnuncioDescription from './AnuncioDescription';
import ComentarioItem from './ComentarioItem';
import ComodidadeItem from './ComodidadeItem';
import ImageList from './ImageList';

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: '1em', paddingBottom: '1em' },
  titleContainer: {
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  favoriteText: {
    marginLeft: '5%',
  },
  textGutterBottom: {
    marginBottom: '0.5em',
  },
  pageBottomContainer: {
    paddingTop: '3em',
    paddingBottom: '3em',
  },
  commentList: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'auto',
    maxHeight: '15em',
    paddingTop: '0',
    paddingBottom: '0',
  },
  interestButton: {
    height: '3.5em',
  },
  removeButton: {
    height: '3.5em',
    color: '#FFFFFF',
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));

const AnuncioDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { activeAnuncio, fetchActiveAnuncio, toggleInterest, toggleFavorite } = useContext(
    AnuncioContext
  );
  const { subscriberConfirmRent, subscriberRemoveRent } = useContext(PropriedadeContext);
  const { favorites, user } = useContext(AuthContext);
  const { comodidades } = activeAnuncio;

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  const handleFavoritePress = async () => {
    const message = await toggleFavorite(activeAnuncio.id);
    setSnackbarMessage(message);
  };

  const handleInterestPress = async () => {
    const message = await toggleInterest(activeAnuncio.id);
    setSnackbarMessage(message);
  };

  const handleConfirmRent = async () => {
    const message = await subscriberConfirmRent(activeAnuncio.interest.id);
    setSnackbarMessage(message);
  };

  const handleRemoveRent = async () => {
    const message = await subscriberRemoveRent(activeAnuncio.rent.id);
    setSnackbarMessage(message);
  };

  useEffect(() => {
    const { pathname } = window.location;

    const activeAnuncioId = pathname.replace('/anuncios/', '');
    const fetchOneAd = async () => {
      const message = await fetchActiveAnuncio(activeAnuncioId);
      setSnackbarMessage(message);
    };
    fetchOneAd();
  }, [favorites, user]);

  return (
    <Container className={classes.root}>
      <Container className={classes.titleContainer}>
        <Grid
          justify='space-between'
          alignItems='center'
          spacing={2}
          container
          className={classes.textGutterBottom}
        >
          <Grid item>
            <Typography variant='h1'>{activeAnuncio.name}</Typography>
          </Grid>
          {user.role !== 'ADMIN' ? (
            <Grid item>
              {!activeAnuncio.rent ? (
                <Grid container spacing={2}>
                  <Grid item>
                    {activeAnuncio.isInterest ? (
                      <Button
                        className={classes.removeButton}
                        fullWidth
                        variant='contained'
                        startIcon={<DeleteIcon />}
                        onClick={handleInterestPress}
                      >
                        Remover Interesse
                      </Button>
                    ) : (
                      <Button
                        color='primary'
                        className={classes.interestButton}
                        fullWidth
                        variant='contained'
                        startIcon={<HandIcon />}
                        onClick={handleInterestPress}
                      >
                        Demonstrar Interesse
                      </Button>
                    )}
                  </Grid>
                  {activeAnuncio.interest && activeAnuncio.interest.pConfirmation ? (
                    <Grid item>
                      <Button
                        color='primary'
                        className={classes.interestButton}
                        fullWidth
                        variant='contained'
                        startIcon={<DoneAllIcon />}
                        onClick={handleConfirmRent}
                      >
                        Confirmar aluguel
                      </Button>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    className={classes.removeButton}
                    fullWidth
                    variant='contained'
                    startIcon={<DeleteIcon />}
                    onClick={handleRemoveRent}
                  >
                    Desfazer aluguel
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : (
            <></>
          )}
        </Grid>

        <Grid container justify='space-between' alignItems='baseline' spacing={2}>
          <Grid item>
            <Rating
              name='read-only'
              value={activeAnuncio.avg ? activeAnuncio.avg.value : null}
              precision={0.2}
              readOnly
            />
          </Grid>
          <IconButton onClick={handleFavoritePress}>
            {activeAnuncio.isFavorite ? (
              <>
                <FavoriteIcon color='action' />
                <Typography className={classes.favoriteText} variant='h4'>
                  Desfavoritar
                </Typography>
              </>
            ) : (
              <>
                <FavoriteBorderIcon color='action' />
                <Typography className={classes.favoriteText} variant='h4'>
                  Favoritar
                </Typography>
              </>
            )}
          </IconButton>
        </Grid>
      </Container>

      <ImageList images={activeAnuncio.img} />

      <AnuncioDescription anuncio={activeAnuncio} />

      <Divider />

      <Container className={classes.pageBottomContainer}>
        <Grid container direction='row' wrap='wrap' spacing={10}>
          <Grid item xs={12} sm={6}>
            <Grid container direction='column' justify='space-evenly' spacing={6}>
              <Grid item>
                <Typography gutterBottom variant='h2'>
                  Comodidades
                </Typography>
              </Grid>
              {comodidades && comodidades.length > 0 ? (
                comodidades.map((comodidade) => <ComodidadeItem nome={comodidade.nome} />)
              ) : (
                <Grid item>
                  <Typography variant='h4'>
                    Nenhuma comodidade cadastrada nesta propriedade
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {activeAnuncio.comentarios > 0 ? (
            <Grid item xs={12} sm={6}>
              <Grid container direction='column' justify='space-evenly' spacing={6}>
                <Grid item>
                  <Grid container direction='row' wrap='nowrap' spacing={2}>
                    <Grid item>
                      <StarIcon color='action' fontSize='large' style={{ color: '#3F51B5' }} />
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant='h2'>
                        {/* TODO nota e quantidade de comentarios */}
                        {`${activeAnuncio.avg.value || 'Sem nota'} (${0} comentários)`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <List className={classes.commentList}>
                    {/* TODO lista de comentarios que vem da api */}
                    {/* <ComentarioItem /> */}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
      <Divider />
      <CustomSnackbar message={snackbarMessage} handleCloseSnackbar={handleCloseSnackbar} />
    </Container>
  );
};

AnuncioDetails.propTypes = {
  className: PropTypes.string,
};

export default AnuncioDetails;
