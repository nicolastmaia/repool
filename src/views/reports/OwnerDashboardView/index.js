import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import RentUsers from './RentUsers';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  meusInquilinos: {
    marginTop: '1em',
  },
}));

const OwnerDashboard = () => {
  const classes = useStyles();
  const { fetchPropriedadesProprias, propriedadesProprias, allRents, fetchAllRents } = useContext(
    PropriedadeContext
  );
  const [occupiedVacs, setOccupiedVacs] = useState(0);
  const [lucroTotalAtual, setLucroTotalAtual] = useState(0);
  const [lucroTotalPossivel, setLucroTotalPossivel] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const { pathname } = window.location;

  useEffect(() => {
    let tmpLucroTotalAtual = 0;
    let tmpLucroTotalPossivel = 0;
    let tmpTotalViews = 0;
    const tmpOccupiedVacs = {};
    propriedadesProprias.forEach((propriedade) => {
      const count = propriedade.rent.filter((item) => item.isActive).length;
      tmpOccupiedVacs[propriedade.id] = count;
      tmpLucroTotalAtual += propriedade.vacancyPrice * count;
      tmpLucroTotalPossivel += propriedade.vacancyPrice * propriedade.vacancyNumber;
      tmpTotalViews += propriedade.viewed;
    });
    setLucroTotalPossivel(tmpLucroTotalPossivel);
    setLucroTotalAtual(tmpLucroTotalAtual);
    setOccupiedVacs(tmpOccupiedVacs);
    setTotalViews(tmpTotalViews);
  }, [propriedadesProprias]);

  useEffect(() => {
    fetchAllRents();
  }, [propriedadesProprias]);

  useEffect(() => {
    const fetchMyProps = async () => {
      await fetchPropriedadesProprias();
    };
    fetchMyProps();
  }, [pathname]);

  return (
    <Page className={classes.root} title='OwnerDashboard'>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders propriedades={propriedadesProprias} occupiedVacs={occupiedVacs} />
          </Grid>

          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <TotalProfit
              lucroTotalAtual={lucroTotalAtual}
              lucroTotalPossivel={lucroTotalPossivel}
            />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers totalViews={totalViews} />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget lucroTotalAtual={lucroTotalAtual} />
          </Grid>

          <Grid item lg={12}>
            <Typography className={classes.meusInquilinos} variant='h1'>
              Resumo dos meus inquilinos
            </Typography>
          </Grid>

          {propriedadesProprias.map((propriedade) => {
            const rents = allRents.filter(
              (rent) => rent.propertyId === propriedade.id && rent.isActive
            );
            return (
              <Grid item lg={3} md={12} xl={4} xs={12}>
                <RentUsers propName={propriedade.name} propId={propriedade.id} data={rents} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Page>
  );
};

export default OwnerDashboard;
