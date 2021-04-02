import { Container, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';
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

const AnuncioDescription = () => {
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget
          ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor
          et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing
        </ShowMoreText>
      </Typography>
      <Typography variant='h4'>2 vagas</Typography>
    </Container>
  );
};

export default AnuncioDescription;
