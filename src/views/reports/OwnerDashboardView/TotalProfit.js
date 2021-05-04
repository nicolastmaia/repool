import {
  Avatar,
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPriceToBr } from 'src/utils/numberUtils';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalProfit = ({ className, lucroTotalAtual, lucroTotalPossivel, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              Lucro Mensal Atual
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {formatPriceToBr(lucroTotalAtual)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              Lucro Mensal Possível
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {formatPriceToBr(lucroTotalPossivel)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={(lucroTotalAtual * 100) / lucroTotalPossivel}
            variant='determinate'
          />
          <Typography variant='caption'>
            {((lucroTotalAtual * 100) / lucroTotalPossivel).toFixed(1)} %
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
  lucroTotalAtual: PropTypes.number,
  lucroTotalPossivel: PropTypes.number,
};

export default TotalProfit;
