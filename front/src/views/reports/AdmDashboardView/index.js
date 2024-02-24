import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Page from 'src/components/Page';
import AdminContext from 'src/contexts/AdminContext';
import PropsChart from './PropsChart';
import UsersBySex from './UsersBySex';

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

const AdmDashboard = () => {
  const classes = useStyles();
  const {
    usersBySex,
    propsByState,
    activePropsByState,
    getQtdUsersBySex,
    getQtdPropsByState,
  } = useContext(AdminContext);

  const { pathname } = window.location;

  useEffect(() => {}, []);

  useEffect(() => {
    const getChartData = async () => {
      await getQtdUsersBySex();
      await getQtdPropsByState();
    };
    getChartData();
  }, [pathname]);

  return (
    <Page className={classes.root} title='Dashboard'>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xl={3} xs={12}>
            <UsersBySex usersBySex={usersBySex} />
          </Grid>

          <Grid item lg={8} md={8} sm={12} xl={9} xs={12}>
            <PropsChart
              propsByState={propsByState}
              activePropsByState={activePropsByState}
              title='Propriedades criadas e anunciadas por Estado no último mês'
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AdmDashboard;
