import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import Toolbar from './Toolbar';
import PropriedadeCard from './ProprieadeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  propriedadeCard: {
    height: '100%',
  },
}));

const PropriedadeList = () => {
  const classes = useStyles();
  const { propriedades, fetchPropriedades } = useContext(PropriedadeContext);

  useEffect(() => {
    fetchPropriedades();
  }, []);

  return (
    <Page className={classes.root} title='Propriedades'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {propriedades.map((propriedade) => (
              <Grid item key={propriedade.id} lg={4} md={6} xs={12}>
                <PropriedadeCard
                  className={classes.propriedadeCard}
                  propriedade={propriedade}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={1} size='small' />
          {/* quantidade de páginas de anúncios aqui em cima.
          precisa variar com a quantidade de itens que teremos em cada página */}
        </Box>
      </Container>
    </Page>
  );
};

export default PropriedadeList;
