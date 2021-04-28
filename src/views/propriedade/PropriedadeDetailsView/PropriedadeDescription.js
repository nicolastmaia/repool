import { Container, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';

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

const PropriedadeDescription = ({ anuncio }) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prevState) => !prevState);
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
          Há {anuncio.vacancyNumber} vagas nessa propriedade
        </Typography>
        <Typography variant='h4'>
          Valor de uma vaga: R${anuncio.vacancyPrice}
        </Typography>
      </Container>
    </Container>
  );
};

PropriedadeDescription.propTypes = {
  anuncio: PropTypes.object,
};

export default PropriedadeDescription;
