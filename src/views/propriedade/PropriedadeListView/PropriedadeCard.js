import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from 'src/contexts/AuthContext';
import comodidadesContent from '../../../constants/comodidades';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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

const PropriedadeCard = ({ openConfirmDialog, className, propriedade, rate, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { comodidades } = propriedade;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Link
          to={
            propriedade.ownerId === user.id
              ? `/propriedades/${propriedade.id}`
              : `/anuncios/${propriedade.id}`
          }
        >
          <Box position='relative' mb={3}>
            <Avatar
              alt='Propriedade'
              src={propriedade.img ? propriedade.img[0] : ''}
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
            {`${propriedade.name}`}
          </Typography>
          <Typography align='center' color='textPrimary' variant='body1'>
            {`${propriedade.city}, ${propriedade.uf}`}
          </Typography>
        </Link>
      </CardContent>

      <Divider />
      <Box p={0.5}>
        <Grid container justify='space-between' spacing={2}>
          <Grid className={classes.statsItem} item>
            <Box component='fieldset' borderColor='transparent'>
              <Rating name='read-only' value={rate} precision={0.2} readOnly />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

PropriedadeCard.propTypes = {
  openConfirmDialog: PropTypes.func,
  className: PropTypes.string,
  propriedade: PropTypes.object.isRequired,
  rate: PropTypes.number,
};

export default PropriedadeCard;
