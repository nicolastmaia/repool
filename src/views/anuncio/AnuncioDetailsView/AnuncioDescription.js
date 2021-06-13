import { Container, Typography, makeStyles, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import PropTypes from 'prop-types';

import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { formatPriceToBr } from 'src/utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  descriptionContainer: {
    paddingTop: '3em',
    paddingBottom: '3em',
  },
  textGutterBottom: {
    marginBottom: '1em',
  },
  vacacyInfo: {
    paddingTop: '3em',
  },
}));

const AnuncioDescription = ({ anuncio }) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  const { vacancyPrice } = anuncio;

  const toggleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  const renderVacancyNumber = () => {
    const { vacancyNumber } = anuncio;
    if (vacancyNumber === 1) {
      return `Há ${vacancyNumber} vaga nessa propriedade`;
    }
    if (vacancyNumber > 1) {
      return `Há ${vacancyNumber} vagas nessa propriedade`;
    }
    return 'Não há nenhuma vaga nessa propriedade';
  };

  return (
    <Container className={classes.descriptionContainer}>
      <Typography style={{ paddingBottom: '3em' }} variant='h4'>
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

      <Divider />
      <Container className={classes.vacacyInfo}>
        <Typography className={classes.textGutterBottom} variant='h3'>
          {renderVacancyNumber()}
        </Typography>
        <Typography variant='h4'>
          Valor de uma vaga: {formatPriceToBr(vacancyPrice || 0)}
        </Typography>
      </Container>
    </Container>
  );
};

AnuncioDescription.propTypes = {
  anuncio: PropTypes.object,
};

export default AnuncioDescription;
