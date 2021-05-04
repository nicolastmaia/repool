/* eslint-disable no-nested-ternary */
import { Button, Container, Divider, Grid, List, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/StarRate';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from 'src/components/CustomSnackbar';
import UserInterestDialog from 'src/components/UserInterestDialog';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import UserRentDialog from 'src/components/UserRentDialog';
import ComentarioItem from './ComentarioItem';
import ComodidadeItem from './ComodidadeItem';
import ImageList from './ImageList';
import InterestedUsers from './InterestedUsers';
import RentUsers from './RentUsers';
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
  editButton: {
    height: '3.5em',
  },
  removeButton: {
    height: '3.5em',
    color: red[400],
    borderColor: red[400],
    '&:hover': {
      borderColor: red[700],
      backgroundColor: red[700],
      color: '#FFFFFF',
    },
  },
}));

const PropriedadeDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const {
    activePropriedade,
    activePropInterests,
    activePropRents,
    fetchActivePropriedade,
  } = useContext(PropriedadeContext);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isUserInterestDialogOpen, setUserInterestDialogOpen] = useState(false);
  const [isUserRentDialogOpen, setUserRentDialogOpen] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(null);
  const navigate = useNavigate();

  const { pathname } = window.location;

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  const handleEditPress = () => {
    navigate('/propriedades/edit');
  };

  const handleDeletePress = () => {};

  const toggleInterestDialog = (userData) => {
    setDialogInfo(userData || null);
    setUserInterestDialogOpen((prevState) => !prevState);
  };

  const toggleRentDialog = (userData) => {
    setDialogInfo(userData || null);
    setUserRentDialogOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const activePropriedadeId = pathname.replace('/propriedades/', '');
    const fetchOneId = async () => {
      const message = await fetchActivePropriedade(activePropriedadeId);
      setSnackbarMessage(message);
    };
    fetchOneId();
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
            <Typography variant='h1'>{activePropriedade.name}</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  className={classes.editButton}
                  fullWidth
                  variant='contained'
                  startIcon={<EditIcon />}
                  onClick={handleEditPress}
                >
                  Editar Propriedade
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.removeButton}
                  fullWidth
                  variant='outlined'
                  startIcon={<DeleteIcon />}
                  onClick={handleDeletePress}
                >
                  Remover Propriedade
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify='flex-start' alignItems='baseline' spacing={2}>
          <Grid item>
            <Rating
              name='read-only'
              value={activePropriedade.avg ? activePropriedade.avg.value : null}
              precision={0.2}
              readOnly
            />
          </Grid>
        </Grid>
      </Container>

      <ImageList images={activePropriedade.img} />

      <PropriedadeDescription propriedade={activePropriedade} activeRents={activePropRents} />

      <Divider />

      <Container className={classes.pageBottomContainer}>
        <Grid container direction='row' wrap='wrap' spacing={10}>
          {activePropriedade.comodidades ? (
            <Grid item xs={12} sm={6}>
              <Grid container direction='column' justify='space-evenly' spacing={6}>
                <Grid item>
                  <Typography gutterBottom variant='h2'>
                    Comodidades
                  </Typography>
                </Grid>
                {activePropriedade.comodidades.map((comodidade) => (
                  <ComodidadeItem nome={comodidade.nome} />
                ))}
              </Grid>
            </Grid>
          ) : (
            <></>
          )}

          {activePropriedade.comentarios > 0 ? (
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
                        {`${activePropriedade.avg.value || 'Sem nota'} (${0} comentários)`}
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
          ) : (
            <></>
          )}

          <Grid item lg={12} md={12} sm={12}>
            <Grid container direction='row' spacing={6}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <InterestedUsers data={activePropInterests} toggleDialog={toggleInterestDialog} />
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <RentUsers data={activePropRents} toggleDialog={toggleRentDialog} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <CustomSnackbar message={snackbarMessage} handleCloseSnackbar={handleCloseSnackbar} />
      <UserInterestDialog
        toggleDialog={toggleInterestDialog}
        data={dialogInfo}
        isOpen={isUserInterestDialogOpen}
      />
      <UserRentDialog
        toggleDialog={toggleRentDialog}
        data={dialogInfo}
        isOpen={isUserRentDialogOpen}
      />
    </Container>
  );
};

PropriedadeDetails.propTypes = {
  className: PropTypes.string,
};

export default PropriedadeDetails;
