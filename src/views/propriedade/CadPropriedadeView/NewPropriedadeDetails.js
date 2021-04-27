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
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { ibgeApi } from 'src/api/base';
import AvatarPicker from 'src/components/AvatarPicker';
import CustomSnackbar from 'src/components/CustomSnackbar';
import AuthContext from 'src/contexts/AuthContext';
import PropriedadeContext from 'src/contexts/PropriedadeContext';
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

  const [values, setValues] = useState({
    name: null,
    description: null,
    category: null,
    cep: null,
    street: null,
    neighborhood: null,
    city: null,
    uf: null,
    country: 'Brasil',
    number: null,
    complement: null,
    hasPool: false,
    hasGarage: false,
    hasGourmet: false,
    hasInternet: false,
    isPetFriendly: false,
    isAdversiment: false,
    vacancyNumber: 0,
    vacancyPrice: 0,
  });

  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [cities, setCities] = useState([]);

  const [selectedComodidades, setSelectedComodidades] = useState([]);
  const [isAdvertising, setIsAdvertising] = useState(false);

  const [avatarFile, setAvatarFile] = useState('');

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSelectComodidade = (event, newComodidades) => {
    setSelectedComodidades(newComodidades);
  };

  const handleAdChange = () => {
    setIsAdvertising((prevState) => !prevState);
  };

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value || null,
    };
    setValues(newValues);
    if (event.target.name === 'uf') {
      const tmpUf = ufs.find((element) => {
        return element.sigla === event.target.value;
      });
      setSelectedUf(tmpUf);
    }
  };

  const handleFileChange = (image) => {
    setAvatarFile(image);
  };

  const handleSave = async () => {
    const message = await savePropriedade(values, avatarFile);
    setSnackbarMessage(message);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  useEffect(() => {
    setValues((prevState) => ({ ...prevState, isAdversiment: isAdvertising }));
  }, [isAdvertising]);

  useEffect(() => {
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

    setValues((prevState) => {
      return {
        ...prevState,
        ...elements,
      };
    });
  }, [selectedComodidades]);

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
    setValues({ ...values, city: '' });
  }, [selectedUf]);

  return (
    <form
      autoComplete='off'
      noValidate
      className={clsx(classes.root, className)}
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
                fullWidth
                label='Título da propriedade'
                name='name'
                onChange={handleChange}
                required
                value={values.name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Categoria'
                name='category'
                select
                onChange={handleChange}
                required
                value={values.category}
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
                fullWidth
                label='CEP'
                name='cep'
                onChange={handleChange}
                required
                value={values.cep}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='País'
                name='country'
                defaultValue='Brasil'
                InputProps={{
                  readOnly: true,
                }}
                onChange={handleChange}
                value={values.country}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='UF'
                name='uf'
                select
                onChange={handleChange}
                required
                value={values.uf}
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
                fullWidth
                label='Cidade'
                name='city'
                select
                onChange={handleChange}
                required
                value={values.city}
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
                fullWidth
                label='Bairro'
                name='neighborhood'
                onChange={handleChange}
                required
                value={values.neighborhood}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Rua'
                name='street'
                onChange={handleChange}
                required
                value={values.street}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Número do prédio'
                name='number'
                onChange={handleChange}
                value={values.number}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Complemento'
                name='complement'
                onChange={handleChange}
                value={values.complement}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Quantidade de vagas'
                name='vacancyNumber'
                type='number'
                onChange={handleChange}
                value={values.vacancyNumber}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Preço das vagas'
                name='vacancyPrice'
                type='number'
                onChange={handleChange}
                value={values.vacancyPrice}
                variant='outlined'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label='Descrição personalizada'
                name='description'
                multiline
                onChange={handleChange}
                value={values.description}
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
                        <ToggleButton
                          value={comodidade.attribute}
                          aria-label='bold'
                        >
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
            variant='contained'
            onClick={handleSave}
          >
            Salvar
          </Button>
          <Button style={{ margin: 8 }} variant='contained'>
            Cancelar
          </Button>
          <CustomSnackbar
            message={snackbarMessage}
            handleCloseSnackbar={handleCloseSnackbar}
          />
        </Box>
      </Card>
    </form>
  );
};

NewPropriedadeDetails.propTypes = {
  className: PropTypes.string,
};

export default NewPropriedadeDetails;
