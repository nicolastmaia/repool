import { Container, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import PropTypes from 'prop-types';

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  descriptionContainer: {
    paddingTop: '3em',
    paddingBottom: '3em',
  },
  textGutterBottom: {
    marginBottom: '1em',
  },
}));

const AnuncioDescription = ({ anuncio }) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  return (
    <Container className={classes.descriptionContainer}>
      <Typography
        variant='h2'
        gutterBottom
        className={classes.textGutterBottom}
      >
        <ShowMoreText
          lines={1}
          more={<ExpandMoreIcon />}
          less={<ExpandLessIcon />}
          onClick={toggleExpand}
          expanded={expand}
          width={500}
        >
          {anuncio.description}
        </ShowMoreText>
      </Typography>
      <Typography gutterBottom variant='h4'>
        Há {anuncio.vacancyNumber} vagas nessa propriedade
      </Typography>
      <Typography variant='h4'>
        Valor de uma vaga: R${anuncio.vacancyPrice}
      </Typography>
    </Container>
  );
};

AnuncioDescription.propTypes = {
  anuncio: PropTypes.object,
};

export default AnuncioDescription;
