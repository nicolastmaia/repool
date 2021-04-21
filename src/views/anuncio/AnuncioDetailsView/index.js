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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/StarRate';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import anuncioApi from 'src/api/anuncios';
import CustomSnackbar from 'src/components/CustomSnackbar';
import AnuncioContext from 'src/contexts/AnuncioContext';
import anuncioUtils from 'src/utils/anuncioUtils';
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
}));

const AnuncioDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const [value] = useState(2.1);
  const { activeAnuncio, fetchActiveAnuncio } = useContext(AnuncioContext);
  const { comodidades } = activeAnuncio;

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  const { pathname } = window.location;

  const handleFavoritePress = () => {
    if (isFavorite) {
      return true;
    }
    console.log(activeAnuncio);
    return false;
  };

  useEffect(() => {
    const activeAnuncioId = pathname.replace('/anuncios/', '');
    const fetchOneAd = async () => {
      const message = await fetchActiveAnuncio(activeAnuncioId);
      setSnackbarMessage(message);
    };
    fetchOneAd();
  }, []);

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
          <Grid item>
            <Button
              color='primary'
              className={classes.interestButton}
              fullWidth
              variant='contained'
            >
              Demonstrar Interesse
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          justify='space-between'
          alignItems='baseline'
          spacing={2}
        >
          <Grid item>
            <Rating name='read-only' value={value} precision={0.2} readOnly />
          </Grid>
          <IconButton onClick={handleFavoritePress}>
            {isFavorite ? (
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
            <Grid
              container
              direction='column'
              justify='space-evenly'
              spacing={6}
            >
              <Grid item>
                <Typography gutterBottom variant='h2'>
                  Comodidades
                </Typography>
              </Grid>
              {comodidades &&
                comodidades.map((comodidade) => (
                  <ComodidadeItem nome={comodidade.nome} />
                ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction='column'
              justify='space-evenly'
              spacing={6}
            >
              <Grid item>
                <Grid container direction='row' wrap='nowrap' spacing={2}>
                  <Grid item>
                    <StarIcon
                      color='action'
                      fontSize='large'
                      style={{ color: '#3F51B5' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant='h2'>
                      {/* TODO nota e quantidade de comentarios */}
                      2,30 (132 Comentários)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <List className={classes.commentList}>
                  {/* TODO lista de comentarios que vem da api */}
                  <ComentarioItem />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <CustomSnackbar
        message={snackbarMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Container>
  );
};

AnuncioDetails.propTypes = {
  className: PropTypes.string,
};

export default AnuncioDetails;
