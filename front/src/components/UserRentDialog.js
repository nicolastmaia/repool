import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import PropriedadeContext from 'src/contexts/PropriedadeContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '0.5em',
  },
});

function UserRentDialog({ data, toggleDialog, isOpen }) {
  const classes = useStyles();
  const { ownerRemoveRent } = useContext(PropriedadeContext);

  const handleRemoveRent = async () => {
    await ownerRemoveRent(data.id);
    toggleDialog();
  };

  if (data && data.guest) {
    return (
      <Dialog onClose={toggleDialog} open={isOpen}>
        <Card className={classes.root}>
          <CardMedia
            component='img'
            alt={data.guest.name}
            height='140'
            image={data.guest.avatar}
            title={data.guest.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              {data.guest.name}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              E-mail: {data.guest.email}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Celular: {data.guest.cel}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2'>
              Telefone: {data.guest.tel}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {data.guest.bio ? `Biografia: ${data.guest.bio}` : ''}
            </Typography>
          </CardContent>
        </Card>
        <DialogActions>
          <Button onClick={handleRemoveRent} size='small' style={{ color: red[400] }}>
            Desfazer aluguel
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

UserRentDialog.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleDialog: PropTypes.func,
};

export default UserRentDialog;
