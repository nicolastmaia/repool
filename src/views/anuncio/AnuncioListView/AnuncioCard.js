import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AnuncioContext from 'src/contexts/AnuncioContext';
import AuthContext from 'src/contexts/AuthContext';
import { formatPriceToBr } from 'src/utils/numberUtils';
import comodidadesContent from '../../../constants/comodidades';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContentRoot: {
    padding: 5,
    paddingBottom: 16,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    height: 150,
    width: '100%',
  },
  comodidadeIcon: {
    height: 25,
    width: 25,
    color: '#fff',
  },
}));

const AnuncioCard = ({ openConfirmDialog, className, anuncio, ...rest }) => {
  const classes = useStyles();
  const { toggleFavorite } = useContext(AnuncioContext);
  const { userToken } = useContext(AuthContext);
  const { comodidades, isFavorite, isMyProperty } = anuncio;

  const handleFavoritePress = async () => {
    await toggleFavorite(anuncio.id);
    // openConfirmDialog(true);
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Link to={anuncio.isMyProperty ? `/propriedades/${anuncio.id}` : `/anuncios/${anuncio.id}`}>
          <Box position='relative' mb={3}>
            <Avatar
              alt='Anuncio'
              src={anuncio.img ? anuncio.img[0] : ''}
              className={classes.image}
              variant='square'
            />
            <Box display='flex' position='absolute' right={0} bottom={0}>
              {comodidades &&
                comodidades.map((comodidade) => (
                  <Avatar
                    variant='square'
                    style={{
                      backgroundColor: comodidadesContent[comodidade.nome].lightColor,
                    }}
                    className={classes.comodidadeIcon}
                  >
                    <Icon
                      style={{
                        fontSize: 15,
                      }}
                    >
                      {comodidadesContent[comodidade.nome].icon}{' '}
                    </Icon>
                  </Avatar>
                ))}{' '}
            </Box>
          </Box>

          <Typography align='center' color='textPrimary' gutterBottom variant='h4'>
            {anuncio.name}
          </Typography>
          <Typography align='center' color='textPrimary' variant='body1'>
            {`${anuncio.city}, ${anuncio.uf}`}
          </Typography>
        </Link>
      </CardContent>

      <Box p={0.5}>
        <Box mb='0.5em'>
          <Divider />
        </Box>
        <Grid
          container
          style={{ paddingLeft: '0.5em' }}
          justify='space-between'
          alignItems='center'
          spacing={2}
        >
          <Grid item>
            <Typography variant='subtitle1'>{formatPriceToBr(anuncio.vacancyPrice)}</Typography>
          </Grid>
          {userToken && !isMyProperty ? (
            <IconButton onClick={handleFavoritePress}>
              {isFavorite ? <FavoriteIcon color='action' /> : <FavoriteBorderIcon color='action' />}
            </IconButton>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Card>
  );
};

AnuncioCard.propTypes = {
  openConfirmDialog: PropTypes.func,
  className: PropTypes.string,
  anuncio: PropTypes.object.isRequired,
};

export default AnuncioCard;
