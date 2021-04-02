import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import comodidades from './comodidades.json';

const useStyles = makeStyles((theme) => ({
  comodidadeItem: {
    display: 'flex',
  },
}));

const ComodidadeItem = ({ nome }) => {
  const classes = useStyles();
  const comodidade = comodidades[nome];

  return (
    <Grid item className={classes.comodidadeItem}>
      <Icon
        fontSize='large'
        color='primary'
        style={{ color: comodidade.darkColor }}
      >
        {comodidade.icon}
      </Icon>
      <Box ml={3}>
        <Typography gutterBottom variant='h4'>
          {comodidade.titulo}
        </Typography>
        <Typography variant='body1'>{comodidade.descricao}</Typography>
      </Box>
    </Grid>
  );
};

ComodidadeItem.propTypes = {
  nome: PropTypes.string,
};

export default ComodidadeItem;
