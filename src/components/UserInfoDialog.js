import React, { useState } from 'react';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '0.5em',
  },
});

function UserInfoDialog({ data, toggleDialog, isOpen }) {
  const classes = useStyles();

  if (data) {
    return (
      <Dialog onClose={toggleDialog} open={isOpen}>
        <Card className={classes.root}>
          <CardMedia
            component='img'
            alt={data.name}
            height='140'
            image={data.avatar}
            title={data.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              {data.name}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              E-mail: {data.email}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Celular: {data.cel}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Telefone: {data.tel}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {data.bio ? `Biografia: ${data.bio}` : ''}
            </Typography>
          </CardContent>
        </Card>
        <DialogActions>
          <Button size='small' color='primary'>
            Confirmar
          </Button>
          <Button size='small' color='primary'>
            Excluir
          </Button>
          <Button onClick={toggleDialog} size='small' color='primary'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return <></>;
}

UserInfoDialog.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleDialog: PropTypes.func,
};

export default UserInfoDialog;
