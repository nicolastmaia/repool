import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Search as SearchIcon } from 'react-feather';
import AnuncioContext from 'src/contexts/AnuncioContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const checks = [
  { name: 'hasPool', label: 'Possui piscina' },
  { name: 'hasGarage', label: 'Possui garagem' },
  { name: 'hasGourmet', label: 'Possui área gourmet' },
  { name: 'hasInternet', label: 'Possui acesso a internet' },
  { name: 'isPetFriendly', label: 'Aceita animais' },
];

const Toolbar = ({ className, offset, ...rest }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const { searchAnunciosByText, searchAnunciosWithFilter } = useContext(AnuncioContext);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const [checked, setChecked] = useState({
    hasPool: null,
    hasGarage: null,
    hasGourmet: null,
    hasInternet: null,
    isPetFriendly: null,
  });
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(0);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMinimumPriceChange = (event) => {
    setMinimumPrice(event.target.value);
  };

  const handleMaximumPriceChange = (event) => {
    setMaximumPrice(event.target.value);
  };

  const handleCheckChange = (event) => {
    const auxCheck = { ...checked, [event.target.name]: event.target.checked };
    setChecked(auxCheck);
  };

  const handleChangeBusca = () => {
    setAdvancedSearch((prevState) => !prevState);
    setChecked({
      hasPool: null,
      hasGarage: null,
      hasGourmet: null,
      hasInternet: null,
      isPetFriendly: null,
    });
    setInputText('');
    setMinimumPrice(0);
    setMaximumPrice(0);
  };

  useEffect(() => {
    if (advancedSearch) {
      searchAnunciosWithFilter(inputText, checked, minimumPrice, maximumPrice, offset);
    } else {
      searchAnunciosByText(inputText, offset);
    }
  }, [inputText, checked, minimumPrice, maximumPrice]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Procurar anúncio'
                  variant='outlined'
                  value={inputText}
                  onChange={handleTextChange}
                />
              </Grid>

              {advancedSearch ? (
                <>
                  <Grid item>
                    <Button
                      onClick={handleChangeBusca}
                      variant='text'
                      color='primary'
                      endIcon={<ArrowDropUpIcon />}
                    >
                      Busca Simples
                    </Button>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {checks.map((item) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={item.name}
                            checked={checked[item.name]}
                            onChange={handleCheckChange}
                          />
                        }
                        label={item.label}
                      />
                    ))}
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item>
                        <TextField
                          size='small'
                          type='number'
                          label='Preço Mínimo'
                          placeholder='Preço mínimo'
                          variant='outlined'
                          value={minimumPrice}
                          onChange={handleMinimumPriceChange}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          size='small'
                          type='number'
                          label='Preço Máximo'
                          placeholder='Preço máximo'
                          variant='outlined'
                          value={maximumPrice}
                          onChange={handleMaximumPriceChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button
                    onClick={handleChangeBusca}
                    variant='text'
                    color='primary'
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Busca Avançada
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  offset: PropTypes.number,
};

export default Toolbar;
