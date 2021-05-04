import {
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
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

const InterestedUsers = ({ className, data, toggleDialog, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader subtitle={`${data.length} no total`} title='Usuários Interessados' />
      <Divider />
      <List>
        {data.length > 0 ? (
          data.map((interest, i) => (
            <ListItem
              button
              onClick={() => toggleDialog(interest)}
              divider={i < data.length - 1}
              key={interest.User.id}
            >
              <ListItemAvatar>
                <img alt='user' className={classes.image} src={interest.User.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={interest.User.name}
                secondary={`Celular: ${interest.User.cel}`}
              />
              {interest.pConfirmation ? (
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
              ) : (
                <></>
              )}
            </ListItem>
          ))
        ) : (
          <Grid container justify='center'>
            <Typography variant='body2'>Nenhum usuário interessado nesta propriedade</Typography>
          </Grid>
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
