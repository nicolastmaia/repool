import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  listItem: { paddingTop: 0, paddingBottom: 0 },
  divider: { marginTop: '2em', marginBottom: '2em' },
}));

const ComentarioItem = ({ nome }) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState(2);

  const toggleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  return (
    <>
      <ListItem alignItems='flex-start' className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <Box>
          <Typography gutterBottom variant='h4'>
            Nome da pessoa
          </Typography>
          <Box component='fieldset' mb='0.35em' borderColor='transparent'>
            <Rating name='read-only' value={value} readOnly />
          </Box>
          <Typography
            component='span'
            variant='body2'
            className={classes.inline}
            color='textPrimary'
          >
            <ShowMoreText
              lines={1}
              more={<ExpandMoreIcon />}
              less={<ExpandLessIcon />}
              onClick={toggleExpand}
              expanded={expand}
              width={500}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor
              massa. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Nulla at risus. Quisque purus
              magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis,
              felis ut adipiscing
            </ShowMoreText>
          </Typography>
        </Box>
      </ListItem>
      <Divider className={classes.divider} variant='inset' component='li' />
    </>
  );
};

ComentarioItem.propTypes = {
  nome: PropTypes.string,
};

export default ComentarioItem;
