import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import NewPropriedadeDetails from './NewPropriedadeDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Account'>
      <Container maxWidth='lg'>
        <Grid item lg={12} xs={12}>
          <NewPropriedadeDetails />
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
