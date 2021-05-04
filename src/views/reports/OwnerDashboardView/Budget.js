import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import formatNumberToBr from 'src/utils/formatNumberToBr';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const Budget = ({ className, lucroTotalAtual, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item lg={8}>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              Lucro previsto em 6 meses
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {formatNumberToBr(lucroTotalAtual * 6)}
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
  lucroTotalAtual: PropTypes.number,
};

export default Budget;
