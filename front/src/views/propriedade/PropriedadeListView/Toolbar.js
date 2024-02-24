import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cadButton: { height: '3em' },
}));

const Toolbar = ({ className }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={clsx(classes.root, className)}>
      <Box mt={1}>
        <Grid container justify='flex-end'>
          <Grid item lg={3} md={3} sm={5} xs={12}>
            <Button
              className={classes.cadButton}
              fullWidth
              onClick={() => navigate('new')}
              color='primary'
              variant='contained'
            >
              Cadastrar Propriedade
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
