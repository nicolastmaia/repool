/* eslint-disable no-nested-ternary */
import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/StarRate';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from 'src/components/CustomSnackbar';
import AnuncioContext from 'src/contexts/AnuncioContext';
import ComentarioItem from './ComentarioItem';
import ComodidadeItem from './ComodidadeItem';
import ImageList from './ImageList';
import PropriedadeDescription from './PropriedadeDescription';

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

const PropriedadeDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value] = useState(2.1);
  const { activeAnuncio, fetchActiveAnuncio } = useContext(AnuncioContext);
  const { comodidades } = activeAnuncio;

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const { pathname } = window.location;

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  const handleEditPress = () => {
    navigate('/propriedades/edit');
  };

  const handleDeletePress = () => {};

  useEffect(() => {
    const activeAnuncioId = pathname.replace('/propriedades/', '');
    const fetchOneAd = async () => {
      const message = await fetchActiveAnuncio(activeAnuncioId);
      setSnackbarMessage(message);
    };
    fetchOneAd();
  }, [pathname]);

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
              className={classes.interestButton}
              fullWidth
              variant='contained'
              startIcon={<EditIcon />}
              onClick={handleEditPress}
            >
              Editar Propriedade
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
          <Grid item>
            <Button
              className={classes.removeButton}
              fullWidth
              variant='contained'
              startIcon={<DeleteIcon />}
              onClick={handleDeletePress}
            >
              Deletar Propriedade
            </Button>
          </Grid>
        </Grid>
      </Container>

      <ImageList images={activeAnuncio.img} />

      <PropriedadeDescription anuncio={activeAnuncio} />

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

PropriedadeDetails.propTypes = {
  className: PropTypes.string,
};

export default PropriedadeDetails;
