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
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

const UsersBySex = ({ className, usersBySex, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: usersBySex ? [usersBySex.men, usersBySex.women, usersBySex.unknow] : [0, 0, 0],
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

  const devices = [
    {
      title: 'Masculino',
      value: usersBySex ? ((usersBySex.men * 100) / usersBySex.all).toFixed(1) : 0,
      icon: LaptopMacIcon,
      color: colors.indigo[500],
    },
    {
      title: 'Feminino',
      value: usersBySex ? ((usersBySex.women * 100) / usersBySex.all).toFixed(1) : 0,
      icon: TabletIcon,
      color: colors.red[600],
    },
    {
      title: 'Outros',
      value: usersBySex ? ((usersBySex.unknow * 100) / usersBySex.all).toFixed(1) : 0,
      icon: PhoneIcon,
      color: colors.orange[600],
    },
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Usuários criados por gênero no último mês' />
      <Divider />
      <CardContent>
        <Box height={300} position='relative'>
          <Doughnut data={data} options={options} />
        </Box>
        <Box display='flex' justifyContent='center' mt={2}>
          {devices.map(({ color, title, value }) => (
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
