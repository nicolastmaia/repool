import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Typography,
  IconButton,
  GridList,
  GridListTile,
} from '@material-ui/core';
import AuthContext from 'src/contexts/AuthContext';
import PetIcon from '@material-ui/icons/PetsOutlined';
import PoolIcon from '@material-ui/icons/PoolOutlined';
import GourmetAreaIcon from '@material-ui/icons/FastfoodOutlined';
import CarIcon from '@material-ui/icons/DirectionsCarOutlined';
import WifiIcon from '@material-ui/icons/WifiOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import ShowMoreText from 'react-show-more-text';

import { Rating } from '@material-ui/lab';

const tileData = [
  {
    img: 'https://picsum.photos/500/300?random=1',
    title: 'Breakfast',
    author: 'jill111',
    cols: 2,
    featured: true,
  },
  {
    img: 'https://picsum.photos/500/300?random=2',
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: 'https://picsum.photos/500/300?random=3',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'https://picsum.photos/500/300?random=4',

    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'https://picsum.photos/500/300?random=5',

    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'https://picsum.photos/500/300?random=6',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'https://picsum.photos/500/300?random=7',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/500/300?random=8',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'https://picsum.photos/500/300?random=9',
    title: 'Mushrooms',
    author: 'PublicDomainPictures',
  },
  {
    img: 'https://picsum.photos/500/300?random=10',
    title: 'Olive oil',
    author: 'congerdesign',
  },
  {
    img: 'https://picsum.photos/500/300?random=11',
    title: 'Sea star',
    cols: 2,
    author: '821292',
  },
  {
    img: 'https://picsum.photos/500/300?random=12',
    title: 'Bike',
    author: 'danfador',
  },
];

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: '1em', paddingBottom: '1em' },
  imageGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gridList: {
    maxHeight: 350,
  },
  titleContainer: {
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  descriptionContainer: {
    paddingTop: '3em',
    paddingBottom: '3em',
  },
  favoriteText: {
    marginLeft: '5%',
  },
  textGutterBottom: {
    marginBottom: '1em',
  },
  featureContainer: {
    paddingTop: '3em',
    paddingBottom: '3em',
  },
  featureItem: {
    display: 'flex',
  },
  petIcon: {
    color: '#4D935E',
  },
  poolIcon: {
    color: '#39A5A7',
  },
  carIcon: {
    color: '#B52C2C',
  },
  wifiIcon: {
    color: '#858DFF',
  },
  gourmetIcon: {
    color: '#B2942E',
  },
}));

const AnuncioDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const [value, setValue] = useState(2);
  const [expand, setExpand] = useState(false);

  const handleFavoritePress = () => {
    if (isFavorite) {
      return true;
    }
    return false;
  };

  const toggleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  return (
    <Container className={classes.root}>
      <Container className={classes.titleContainer}>
        <Typography className={classes.textGutterBottom} variant='h1'>
          Quarto com banheiro na Paulista
        </Typography>
        <Grid
          container
          justify='space-between'
          alignItems='baseline'
          spacing={2}
        >
          <Grid item>
            <Rating name='read-only' value={value} readOnly />
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

      <Container className={classes.imageGridContainer}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </Container>

      <Container className={classes.descriptionContainer}>
        <Typography
          variant='h2'
          gutterBottom
          className={classes.textGutterBottom}
        >
          <ShowMoreText
            lines={1}
            more={<ExpandMoreIcon />}
            less={<ExpandLessIcon />}
            onClick={toggleExpand}
            expanded={expand}
            width={500}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget
            ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor
            et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing
          </ShowMoreText>
        </Typography>
        <Typography variant='h4'>2 vagas</Typography>
      </Container>

      <Divider />

      <Container className={classes.featureContainer}>
        <Grid container direction='column' justify='space-evenly' spacing={6}>
          <Grid item>
            <Typography gutterBottom variant='h2'>
              Comodidades
            </Typography>
          </Grid>
          <Grid item className={classes.featureItem}>
            <PetIcon
              fontSize='large'
              color='primary'
              className={classes.petIcon}
            />
            <Box ml={3}>
              <Typography gutterBottom variant='h4'>
                Traga seu pet
              </Typography>
              <Typography variant='body1'>Descrição da feature</Typography>
            </Box>
          </Grid>
          <Grid item className={classes.featureItem}>
            <Box>
              <PoolIcon
                fontSize='large'
                color='primary'
                className={classes.poolIcon}
              />
            </Box>
            <Box ml={3}>
              <Typography gutterBottom variant='h4'>
                Tem piscina
              </Typography>
              <Typography variant='body1'>Descrição da feature</Typography>
            </Box>
          </Grid>
          <Grid item className={classes.featureItem}>
            <Box>
              <CarIcon
                fontSize='large'
                color='primary'
                className={classes.carIcon}
              />
            </Box>
            <Box ml={3}>
              <Typography gutterBottom variant='h4'>
                Tem garagem
              </Typography>
              <Typography variant='body1'>Descrição da feature</Typography>
            </Box>
          </Grid>
          <Grid item className={classes.featureItem}>
            <Box>
              <WifiIcon
                fontSize='large'
                color='primary'
                className={classes.wifiIcon}
              />
            </Box>
            <Box ml={3}>
              <Typography gutterBottom variant='h4'>
                Tem internet wifi
              </Typography>
              <Typography variant='body1'>Descrição da feature</Typography>
            </Box>
          </Grid>
          <Grid item className={classes.featureItem}>
            <Box>
              <GourmetAreaIcon
                fontSize='large'
                color='primary'
                className={classes.gourmetIcon}
              />
            </Box>
            <Box ml={3}>
              <Typography gutterBottom variant='h4'>
                Tem área gourmet
              </Typography>
              <Typography variant='body1'>Descrição da feature</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container className={classes.titleContainer}>
        <Box>comentarios e avaliaçao</Box>
      </Container>
    </Container>
  );
};

AnuncioDetails.propTypes = {
  className: PropTypes.string,
};

export default AnuncioDetails;
