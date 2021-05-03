import {
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  list: {
    overflow: 'auto',
    maxHeight: 150,
  },
  image: {
    height: 48,
    width: 48,
    marginRight: '1em',
  },
});

const RentUsers = ({ className, data, propName, propId, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Link to={`/propriedades/${propId}`}>
        <CardHeader title={propName} />
      </Link>
      <Divider />
      <List className={classes.list}>
        {data.length > 0 ? (
          data.map((rent, i) => (
            <ListItem aria-setsize={2} button divider={i < data.length - 1} key={rent.guest.id}>
              <ListItemAvatar>
                <img alt='guest' className={classes.image} src={rent.guest.avatar} />
              </ListItemAvatar>
              <ListItemText primary={rent.guest.name} secondary={`Celular: ${rent.guest.cel}`} />
            </ListItem>
          ))
        ) : (
          <Grid container justify='center'>
            <Typography variant='body2'>Nenhum inquilino nesta propriedade</Typography>
          </Grid>
        )}
      </List>
      <Divider />
    </Card>
  );
};

RentUsers.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  propName: PropTypes.string,
  propId: PropTypes.number,
};

export default RentUsers;
