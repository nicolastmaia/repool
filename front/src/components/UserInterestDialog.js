import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '0.5em',
  },
});

function UserInterestDialog({ data, toggleDialog, isOpen }) {
  const classes = useStyles();
  const { ownerToggleConfirm } = useContext(PropriedadeContext);

  const handleToggleConfirm = async () => {
    await ownerToggleConfirm(data.id);
    toggleDialog();
  };

  if (data && data.User) {
    return (
      <Dialog onClose={toggleDialog} open={isOpen}>
        <Card className={classes.root}>
          <CardMedia
            component='img'
            alt={data.User.name}
            height='140'
            image={data.User.avatar}
            title={data.User.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              {data.User.name}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              E-mail: {data.User.email}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Celular: {data.User.cel}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Telefone: {data.User.tel}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {data.User.bio ? `Biografia: ${data.User.bio}` : ''}
            </Typography>
          </CardContent>
        </Card>
        <DialogActions>
          {data.pConfirmation ? (
            <Button onClick={handleToggleConfirm} size='small' style={{ color: red[400] }}>
              Desconfirmar
            </Button>
          ) : (
            <Button onClick={handleToggleConfirm} size='small' color='primary'>
              Confirmar
            </Button>
          )}
          <Button onClick={toggleDialog} size='small' color='primary'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return <></>;
}

UserInterestDialog.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleDialog: PropTypes.func,
};

export default UserInterestDialog;
