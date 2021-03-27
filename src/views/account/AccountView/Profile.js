import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AuthContext from 'src/contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${user.email}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color='textSecondary'
            variant='body1'
          >
            {`${user.phone[0] || ''}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color='primary' fullWidth variant='text'>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
