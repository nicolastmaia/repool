import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Link,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';
import AuthContext from 'src/contexts/AuthContext';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const { signup } = useContext(AuthContext);

  return (
    <Page className={classes.root} title='Register'>
      <Box
        display='flex'
        flexDirection='column'
        flexGrow='grow'
        height='100%'
        justifyContent='center'
      >
        <Container maxWidth='sm'>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              cel: '',
              tel: '',
              sex: '',
              password: '',
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email inválido')
                .max(255)
                .required('Email é obrigatório'),
              firstName: Yup.string()
                .max(255)
                .required('First name is required'),
              lastName: Yup.string()
                .max(255)
                .required('Sobrenome é obrigatório'),
              cel: Yup.string().required('Número de celular é obrigatório'),
              tel: Yup.string(),
              sex: Yup.string().required('Gênero é obrigatório'),
              password: Yup.string().max(255).required('Senha é obrigatória'),
              policy: Yup.boolean().oneOf(
                [true],
                'Deve aceitar os termos de contrato para prosseguir'
              ),
            })}
            onSubmit={({
              email,
              firstName,
              lastName,
              cel,
              tel,
              sex,
              password,
            }) => {
              const user = {
                name: `${firstName} ${lastName}`,
                email,
                cel,
                tel,
                sex,
                password,
              };
              signup(user);
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
                    Criar Nova Conta
                  </Typography>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                  >
                    Use seu email para criar uma nova conta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label='Primeiro nome'
                  margin='normal'
                  name='firstName'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label='Sobrenome'
                  margin='normal'
                  name='lastName'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label='Email'
                  margin='normal'
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='email'
                  value={values.email}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.cel && errors.cel)}
                  fullWidth
                  helperText={touched.cel && errors.cel}
                  label='Celular'
                  margin='normal'
                  name='cel'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cel}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.tel && errors.tel)}
                  fullWidth
                  helperText={touched.tel && errors.tel}
                  label='Telefone residencial (se tiver)'
                  margin='normal'
                  name='tel'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tel}
                  variant='outlined'
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label='Senha'
                  margin='normal'
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='password'
                  value={values.password}
                  variant='outlined'
                />
                <Form>
                  <FormLabel component='legend'>Gênero</FormLabel>
                  <RadioGroup
                    style={{ marginLeft: '0.2em' }}
                    defaultValue=''
                    aria-label='sex'
                    name='gender1'
                    value={values.sex}
                  >
                    <FormControlLabel
                      value='FEMALE'
                      control={
                        <Field
                          type='radio'
                          name='sex'
                          value='FEMALE'
                          component={({ field, form, ...props }) => {
                            return <Radio {...field} {...props} />;
                          }}
                        />
                      }
                      label='Mulher'
                    />
                    <FormControlLabel
                      value='MALE'
                      control={
                        <Field
                          type='radio'
                          name='sex'
                          value='MALE'
                          component={({ field, form, ...props }) => {
                            return <Radio {...field} {...props} />;
                          }}
                        />
                      }
                      label='Homem'
                    />
                    <FormControlLabel
                      value='NOTKNOW'
                      control={
                        <Field
                          type='radio'
                          name='sex'
                          value='NOTKNOW'
                          component={({ field, form, ...props }) => {
                            return <Radio {...field} {...props} />;
                          }}
                        />
                      }
                      label='Outro'
                    />
                  </RadioGroup>
                  {Boolean(touched.sex && errors.sex) && (
                    <FormHelperText error>{errors.sex}</FormHelperText>
                  )}
                </Form>

                <Box alignItems='center' display='flex' ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name='policy'
                    onChange={handleChange}
                  />
                  <Typography color='textSecondary' variant='body1'>
                    Li e aceito os{' '}
                    <Link
                      color='primary'
                      component={RouterLink}
                      to='#'
                      underline='always'
                      variant='h6'
                    >
                      Termos e condições
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color='primary'
                    disabled={isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                  >
                    Finalizar Cadastro
                  </Button>
                </Box>
                <Typography color='textSecondary' variant='body1'>
                  Já possui uma conta?{' '}
                  <Link component={RouterLink} to='/' variant='h6'>
                    Fazer Login
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
