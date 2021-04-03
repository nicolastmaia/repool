import {
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
import React, { useContext, useState } from 'react';
import AnuncioContext from 'src/contexts/AnuncioContext';
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
    marginBottom: '1em',
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
}));

const AnuncioDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const [value] = useState(2.1);
  const { activeAnuncio } = useContext(AnuncioContext);

  const handleFavoritePress = () => {
    if (isFavorite) {
      return true;
    }
    console.log(activeAnuncio);
    return false;
  };

  return (
    <Container className={classes.root}>
      <Container className={classes.titleContainer}>
        <Typography className={classes.textGutterBottom} variant='h1'>
          {activeAnuncio.title}
        </Typography>
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

      <ImageList />

      <AnuncioDescription />

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
              {/* TODO lista de comodidades que vem da api */}
              <ComodidadeItem nome='wifi' />
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
    </Container>
  );
};

AnuncioDetails.propTypes = {
  className: PropTypes.string,
};

export default AnuncioDetails;
