import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  Switch,
  TextField,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import clsx from 'clsx';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ibgeApi } from 'src/api/base';
import AvatarPicker from 'src/components/AvatarPicker';
import CustomSnackbar from 'src/components/CustomSnackbar';
import AuthContext from 'src/contexts/AuthContext';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
import * as Yup from 'yup';
import comodidadesContent from '../../../constants/comodidades';

const comodidades = [
  comodidadesContent.pet,
  comodidadesContent.wifi,
  comodidadesContent.garage,
  comodidadesContent.pool,
  comodidadesContent.gourmet,
];

const useStyles = makeStyles(() => ({
  comodidadeIcon: {
    height: 25,
    width: 25,
    color: '#fff',
  },
}));

const NewPropriedadeDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { userToken } = useContext(AuthContext);
  const { savePropriedade } = useContext(PropriedadeContext);

  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedComodidades, setSelectedComodidades] = useState([]);
  const [isAdvertising, setIsAdvertising] = useState(false);

  const [avatarFile, setAvatarFile] = useState('');

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const appendComodidades = (propriedade) => {
    // eslint-disable-next-line prefer-const
    let elements = {
      hasPool: false,
      hasGarage: false,
      hasGourmet: false,
      hasInternet: false,
      isPetFriendly: false,
    };
    selectedComodidades.forEach((element) => {
      elements[element] = true;
    });

    const newPropriedade = { ...propriedade, ...elements };

    return newPropriedade;
  };

  const appendAd = (propriedade) => {
    const newPropriedade = { ...propriedade, isAdvertisement: isAdvertising };
    return newPropriedade;
  };

  const handleSelectComodidade = (event, newComodidades) => {
    setSelectedComodidades(newComodidades);
  };

  const handleAdChange = () => {
    setIsAdvertising((prevState) => !prevState);
  };

  const handleFileChange = (image) => {
    setAvatarFile(image);
  };

  const handleSave = async (propriedade, setSubmittingLoader) => {
    let tmpPropriedade = appendComodidades(propriedade);
    tmpPropriedade = appendAd(tmpPropriedade);

    const message = await savePropriedade(tmpPropriedade, avatarFile);
    setSnackbarMessage(message);
    setSubmittingLoader(false);
    navigate('/propriedades');
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  useEffect(() => {
    const fetchUfs = async () => {
      const { data: estados } = await ibgeApi.get('localidades/estados');
      setUfs(estados);
    };
    fetchUfs();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedUf) {
        const { data: cidades } = await ibgeApi.get(
          `localidades/estados/${selectedUf.id}/municipios`
        );
        setCities(cidades);
      }
    };
    fetchCities();
  }, [selectedUf]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      uf: '',
      country: 'Brasil',
      number: '',
      complement: '',
      hasPool: false,
      hasGarage: false,
      hasGourmet: false,
      hasInternet: false,
      isPetFriendly: false,
      isAdvertisement: false,
      vacancyNumber: 0,
      vacancyPrice: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Nome da propriedade é obrigatório'),
      category: Yup.string().max(255).required('Categoria da propriedade é obrigatória'),
      cep: Yup.string().max(255).required('CEP da propriedade é obrigatório'),
      street: Yup.string().max(255).required('Rua da propriedade é obrigatória'),
      neighborhood: Yup.string().max(255).required('Bairro da propriedade é obrigatório'),
      city: Yup.string().max(255).required('Cidade da propriedade é obrigatório'),
      uf: Yup.string().max(255).required('Estado da propriedade é obrigatório'),
      country: Yup.string().max(255).required('País da propriedade é obrigatório'),
      vacancyNumber: Yup.number(),
      vacancyPrice: Yup.number(),
    }),
    onSubmit: (propriedade, actions) => {
      handleSave(propriedade, actions.setSubmitting);
    },
    validateOnChange: true,
  });

  const handleChange = (event) => {
    if (event.target.name === 'uf') {
      const tmpUf = ufs.find((element) => {
        return element.sigla === event.target.value;
      });
      setSelectedUf(tmpUf);
    }

    formik.handleChange(event);
  };

  return (
    <form
      autoComplete='off'
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Card>
        <CardHeader
          title='Propriedade'
          subheader='Preencha os campos abaixo com as informações da propriedade'
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12}>
              <AvatarPicker handleFileChange={handleFileChange} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
                fullWidth
                label='Título da propriedade'
                name='name'
                onChange={handleChange}
                required
                value={formik.values.name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.category && formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                onBlur={formik.handleBlur}
                fullWidth
                label='Categoria'
                name='category'
                select
                onChange={handleChange}
                required
                value={formik.values.category}
                variant='outlined'
              >
                <MenuItem key={1} value='HOUSE'>
                  Casa
                </MenuItem>
                <MenuItem key={1} value='APARTMENT'>
                  Apartamento
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.cep && formik.errors.cep)}
                helperText={formik.touched.cep && formik.errors.cep}
                onBlur={formik.handleBlur}
                fullWidth
                label='CEP'
                name='cep'
                onChange={handleChange}
                required
                value={formik.values.cep}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.country && formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                onBlur={formik.handleBlur}
                fullWidth
                label='País'
                name='country'
                defaultValue='Brasil'
                InputProps={{
                  readOnly: true,
                }}
                onChange={handleChange}
                value={formik.values.country}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.uf && formik.errors.uf)}
                helperText={formik.touched.uf && formik.errors.uf}
                onBlur={formik.handleBlur}
                fullWidth
                label='UF'
                name='uf'
                select
                onChange={handleChange}
                required
                value={formik.values.uf}
                variant='outlined'
              >
                {ufs.map((uf) => (
                  <MenuItem key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onBlur={formik.handleBlur}
                fullWidth
                label='Cidade'
                name='city'
                select
                onChange={handleChange}
                required
                value={formik.values.city}
                variant='outlined'
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.nome}>
                    {city.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.neighborhood && formik.errors.neighborhood)}
                helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                onBlur={formik.handleBlur}
                fullWidth
                label='Bairro'
                name='neighborhood'
                onChange={handleChange}
                required
                value={formik.values.neighborhood}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.street && formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
                onBlur={formik.handleBlur}
                fullWidth
                label='Rua'
                name='street'
                onChange={handleChange}
                required
                value={formik.values.street}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.number && formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                onBlur={formik.handleBlur}
                fullWidth
                label='Número do prédio'
                name='number'
                onChange={handleChange}
                value={formik.values.number}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.complement && formik.errors.complement)}
                helperText={formik.touched.complement && formik.errors.complement}
                onBlur={formik.handleBlur}
                fullWidth
                label='Complemento'
                name='complement'
                onChange={handleChange}
                value={formik.values.complement}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.vacancyNumber && formik.errors.vacancyNumber)}
                helperText={formik.touched.vacancyNumber && formik.errors.vacancyNumber}
                onBlur={formik.handleBlur}
                fullWidth
                label='Quantidade de vagas'
                name='vacancyNumber'
                type='number'
                onChange={handleChange}
                value={formik.values.vacancyNumber}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.vacancyPrice && formik.errors.vacancyPrice)}
                helperText={formik.touched.vacancyPrice && formik.errors.vacancyPrice}
                onBlur={formik.handleBlur}
                fullWidth
                label='Preço das vagas'
                name='vacancyPrice'
                type='number'
                onChange={handleChange}
                value={formik.values.vacancyPrice}
                variant='outlined'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={formik.handleBlur}
                fullWidth
                label='Descrição personalizada'
                name='description'
                multiline
                onChange={handleChange}
                value={formik.values.description}
                variant='outlined'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <InputLabel style={{ marginBottom: '0.35em' }}>
                    Comodidades da Propriedade
                  </InputLabel>
                  <ToggleButtonGroup
                    value={selectedComodidades}
                    onChange={handleSelectComodidade}
                    aria-label='text formatting'
                  >
                    {comodidades &&
                      comodidades.map((comodidade) => (
                        <ToggleButton value={comodidade.attribute} aria-label='bold'>
                          <Avatar
                            variant='square'
                            style={{
                              backgroundColor: comodidade.lightColor,
                            }}
                            className={classes.comodidadeIcon}
                          >
                            <Icon
                              style={{
                                fontSize: 15,
                              }}
                            >
                              {comodidade.icon}
                            </Icon>
                          </Avatar>
                        </ToggleButton>
                      ))}
                  </ToggleButtonGroup>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel style={{ marginBottom: '0.35em' }}>
                    Ativar anúncio da propriedade?
                  </InputLabel>
                  <Switch
                    checked={isAdvertising}
                    onChange={handleAdChange}
                    color='primary'
                    name='adSwitch'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* TODO Fazer esses botões mais responsivos */}
        <Box display='flex' flexWrap='wrap' justifyContent='flex-end' p={2}>
          <Button
            style={{ margin: 8 }}
            color='primary'
            disabled={formik.isSubmitting}
            type='submit'
            variant='contained'
          >
            Salvar
          </Button>
          <Button style={{ margin: 8 }} variant='contained'>
            Cancelar
          </Button>
          <CustomSnackbar message={snackbarMessage} handleCloseSnackbar={handleCloseSnackbar} />
        </Box>
      </Card>
    </form>
  );
};

NewPropriedadeDetails.propTypes = {
  className: PropTypes.string,
};

export default NewPropriedadeDetails;
