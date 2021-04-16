import {
  Box,
  Button,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CustomSnackbar from 'src/components/CustomSnackbar';
import Page from 'src/components/Page';
import AuthContext from 'src/contexts/AuthContext';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = async (email, password, setSubmittingLoader) => {
    const userCreds = { email, password };
    const message = await login(userCreds);
    setSnackbarMessage(message);
    setSubmittingLoader(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  return (
    <Page className={classes.root} title='Login'>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
      >
        <Container maxWidth='sm'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Deve ser um email válido')
                .max(255)
                .required('Preciso que digite seu email.'),
              password: Yup.string()
                .max(255)
                .required('Preciso que digite sua senha'),
            })}
            onSubmit={({ email, password }, actions) => {
              handleLogin(email, password, actions.setSubmitting);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color='textPrimary' variant='h2'>
                    Login
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label='Email Address'
                  margin='normal'
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='email'
                  value={values.email}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label='Password'
                  margin='normal'
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='password'
                  value={values.password}
                  variant='outlined'
                />
                <Box my={2}>
                  <Button
                    color='primary'
                    disabled={isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                  >
                    Fazer Login
                  </Button>
                </Box>
                <Typography color='textSecondary' variant='body1'>
                  Aindan não tem uma conta?{' '}
                  <Link component={RouterLink} to='/register' variant='h6'>
                    Criar conta
                  </Link>
                </Typography>
                <CustomSnackbar
                  message={snackbarMessage}
                  handleCloseSnackbar={handleCloseSnackbar}
                />
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
