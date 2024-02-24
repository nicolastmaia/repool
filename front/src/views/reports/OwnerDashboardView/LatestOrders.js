import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { formatPriceToBr } from 'src/utils/numberUtils';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestOrders = ({ className, propriedades, occupiedVacs, propMeans, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Minhas propriedades' />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Nome</TableCell>
                <TableCell align='right'>Avaliação geral</TableCell>
                <TableCell align='right'>Visualizaçoes</TableCell>
                <TableCell align='right'>Total de vagas</TableCell>
                <TableCell align='right'>Vagas alugadas</TableCell>
                <TableCell align='right'>R$/vaga</TableCell>
                <TableCell align='right'>R$ total recebido atualmente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propriedades.length > 0 &&
                propriedades.map((propriedade) => (
                  <TableRow hover key={propriedade.id}>
                    <TableCell align='left'>{propriedade.name}</TableCell>
                    <TableCell align='right'>
                      <Grid container justify='flex-end'>
                        <Grid item>
                          <Typography>
                            {propMeans && propMeans[propriedade.id].avg.value
                              ? propMeans[propriedade.id].avg.value
                              : 0}
                          </Typography>
                        </Grid>
                        <StarIcon fontSize='small' color='action' />
                      </Grid>
                    </TableCell>
                    <TableCell align='right'>{propriedade.viewed}</TableCell>
                    <TableCell align='right'>{propriedade.vacancyNumber}</TableCell>
                    <TableCell align='right'>
                      {occupiedVacs ? occupiedVacs[propriedade.id] : 0}
                    </TableCell>
                    <TableCell align='right'>{formatPriceToBr(propriedade.vacancyPrice)}</TableCell>
                    <TableCell align='right'>
                      {formatPriceToBr(propriedade.vacancyPrice * occupiedVacs[propriedade.id])}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
  propriedades: PropTypes.array,
  occupiedVacs: PropTypes.number,
  propMeans: PropTypes.object,
};

export default LatestOrders;
