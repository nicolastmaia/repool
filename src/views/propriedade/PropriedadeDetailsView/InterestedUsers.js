import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  image: {
    height: 48,
    width: 48,
    marginRight: '1em',
  },
});

const InterestedUsers = ({ className, data, toggleDialog, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${data.length} no total`}
        title='Usuários Interessados'
      />
      <Divider />
      <List>
        {data.length > 0 ? (
          data.map((interest, i) => (
            <ListItem
              button
              onClick={() => toggleDialog(interest.User)}
              divider={i < data.length - 1}
              key={interest.User.id}
            >
              <ListItemAvatar>
                <img
                  alt='user'
                  className={classes.image}
                  src={interest.User.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={interest.User.name}
                secondary={`Celular: ${interest.User.cel}`}
              />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </List>
      <Divider />
    </Card>
  );
};

InterestedUsers.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  toggleDialog: PropTypes.func,
};

export default InterestedUsers;
