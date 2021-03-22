import React, { useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import ConfirmDialog from 'src/components/ConfirmDialog';
import Toolbar from './Toolbar';
import AnuncioCard from './AnuncioCard';
import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const AnuncioList = () => {
  const classes = useStyles();
  const [products] = useState(data);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  return (
    <Page className={classes.root} title='Products'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <AnuncioCard
                  openConfirmDialog={openConfirmDialog}
                  className={classes.productCard}
                  product={product}
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
        <ConfirmDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          closeConfirmDialog={closeConfirmDialog}
        />
      </Container>
    </Page>
  );
};

export default AnuncioList;
