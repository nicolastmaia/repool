import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

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

const RentUsers = ({ className, data, toggleDialog, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={`${data.length} Usuários morando nessa propriedade`} />
      <Divider />
      <List>
        {data.length > 0 ? (
          data.map((rent, i) => (
            <ListItem
              button
              onClick={() => toggleDialog(rent)}
              divider={i < data.length - 1}
              key={rent.guest.id}
            >
              <ListItemAvatar>
                <img alt='guest' className={classes.image} src={rent.guest.avatar} />
              </ListItemAvatar>
              <ListItemText primary={rent.guest.name} secondary={`Celular: ${rent.guest.cel}`} />
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

RentUsers.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  toggleDialog: PropTypes.func,
};

export default RentUsers;
