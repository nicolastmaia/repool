import { Box, Card, CardContent, CardHeader, colors, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const PropsChart = ({ className, title, activePropsByState, propsByState, ...rest }) => {
  const classes = useStyles();

  const data = {
    labels: Object.keys(activePropsByState || {}).splice(1),
    datasets: [
      {
        label: 'Anúncios Ativos',
        data: Object.values(activePropsByState || {}).splice(1),
        backgroundColor: colors.red[600],
        borderWidth: 1,
      },
      {
        label: 'Total de Propriedades',
        data: Object.values(propsByState || {}).splice(1),
        backgroundColor: colors.indigo[500],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Box position='relative'>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

PropsChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  propsByState: PropTypes.object,
  activePropsByState: PropTypes.object,
};

export default PropsChart;
