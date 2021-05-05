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
} from '@material-ui/core';
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

const Toolbar = ({ className, offset, ...rest }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const { searchAnunciosByText } = useContext(AnuncioContext);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    searchAnunciosByText(inputText, offset);
  }, [inputText]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
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
            </Box>
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
