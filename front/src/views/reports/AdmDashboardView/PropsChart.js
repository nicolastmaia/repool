import { Box, Card, CardContent, CardHeader, colors, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
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
  const [totalQtds, setTotalQtds] = useState(null);
  const [activeQtds, setActiveQtds] = useState(null);

  const data = {
    labels: Object.keys(activeQtds || {}),
    datasets: [
      {
        label: 'Anúncios Ativos',
        data: Object.values(activeQtds || {}),
        backgroundColor: colors.red[600],
        borderWidth: 1,
      },
      {
        label: 'Total de Propriedades',
        data: Object.values(totalQtds || {}),
        backgroundColor: colors.indigo[500],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (activePropsByState !== null && propsByState !== null) {
      const { propertiesByUfCreatedThirtyDaysAgo: total } = propsByState;
      const { propertiesInAdCreatedThirtyDaysAgo: active } = activePropsByState;

      const totalQtdAux = {};
      const activeQtdAux = {};

      total.forEach((item) => {
        totalQtdAux[item.uf] = item.count.uf;
      });

      active.forEach((item) => {
        activeQtdAux[item.uf] = item.count.uf;
      });

      setTotalQtds(totalQtdAux);
      setActiveQtds(activeQtdAux);
    }
  }, [activePropsByState, propsByState]);

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
