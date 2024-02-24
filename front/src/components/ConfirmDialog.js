import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';

const ConfirmDialog = ({ isConfirmDialogOpen, closeConfirmDialog }) => {
  const handleCancel = () => {
    closeConfirmDialog(false);
  };

  const handleSubscribe = () => {
    closeConfirmDialog(false);
  };

  return (
    <div>
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite seu e-mail abaixo para confirmar a ação.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  isConfirmDialogOpen: PropTypes.bool,
  closeConfirmDialog: PropTypes.func,
};

export default ConfirmDialog;
