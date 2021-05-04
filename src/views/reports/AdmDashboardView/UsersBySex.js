/* eslint-disable indent */
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

const UsersBySex = ({ className, usersBySex, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [quantidades, setQuantidades] = useState(null);

  const data = {
    datasets: [
      {
        data: quantidades
          ? [quantidades.MALE || 0, quantidades.FEMALE || 0, quantidades.UNKNOW || 0]
          : [0, 0, 0],
        backgroundColor: [colors.indigo[500], colors.red[600], colors.orange[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ['Masculino', 'Feminino', 'Outros'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  const people = [
    {
      title: 'Masculino',
      value:
        quantidades && quantidades.MALE
          ? ((quantidades.MALE * 100) / usersBySex.all).toFixed(1)
          : 0,
      color: colors.indigo[500],
    },
    {
      title: 'Feminino',
      value:
        quantidades && quantidades.FEMALE
          ? ((quantidades.FEMALE * 100) / usersBySex.all).toFixed(1)
          : 0,
      color: colors.red[600],
    },
    {
      title: 'Outros',
      value:
        quantidades && quantidades.UNKNOW
          ? ((quantidades.UNKNOW * 100) / usersBySex.all).toFixed(1)
          : 0,
      color: colors.orange[600],
    },
  ];

  useEffect(() => {
    if (usersBySex !== null) {
      const { usersBySexCreatedThirtyDaysAgo: qtds } = usersBySex;
      const qtdAux = {};
      qtds.forEach((item) => {
        qtdAux[item.sex] = item.count.sex;
      });
      setQuantidades(qtdAux);
    }
  }, [usersBySex]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Usuários criados por gênero no último mês' />
      <Divider />
      <CardContent>
        <Box height={300} position='relative'>
          <Doughnut data={data} options={options} />
        </Box>
        <Box display='flex' justifyContent='center' mt={2}>
          {people.map(({ color, title, value }) => (
            <Box key={title} p={1} textAlign='center'>
              <Typography color='textPrimary' variant='body1'>
                {title}
              </Typography>
              <Typography style={{ color }} variant='h2'>
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

UsersBySex.propTypes = {
  className: PropTypes.string,
  usersBySex: PropTypes.object,
};

export default UsersBySex;
