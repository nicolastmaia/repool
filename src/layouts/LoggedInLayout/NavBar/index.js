import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Layout as AnuncioIcon,
  Heart as FavoritoIcon,
  Home as PropriedadeIcon,
  User as UserIcon,
} from 'react-feather';
import AuthContext from 'src/contexts/AuthContext';
import NavItem from './NavItem';

const ownerItems = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/anuncios',
    icon: AnuncioIcon,
    title: 'Anúncios',
  },
  {
    href: '/favoritos',
    icon: FavoritoIcon,
    title: 'Meus Favoritos',
  },
  {
    href: '/propriedades',
    icon: PropriedadeIcon,
    title: 'Minhas Propriedades',
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Perfil',
  },
];

const userItems = [
  {
    href: '/anuncios',
    icon: AnuncioIcon,
    title: 'Anúncios',
  },
  {
    href: '/favoritos',
    icon: FavoritoIcon,
    title: 'Meus Favoritos',
  },
  {
    href: '/propriedades',
    icon: PropriedadeIcon,
    title: 'Minhas Propriedades',
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Perfil',
  },
];

const admItems = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/anuncios',
    icon: AnuncioIcon,
    title: 'Anúncios',
  },
  {
    href: '/favoritos',
    icon: FavoritoIcon,
    title: 'Meus Favoritos',
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Perfil',
  },
];

const loggedOutItems = [
  {
    href: '/anuncios',
    icon: AnuncioIcon,
    title: 'Anúncios',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  name: {
    marginBottom: 5,
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    marginBottom: 15,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user, userToken } = useContext(AuthContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const renderNavItems = () => {
    if (userToken) {
      if (user.role === 'ADMIN') {
        return admItems;
      }
      if (user.role === 'OWNER') {
        return ownerItems;
      }
      return userItems;
    }
    return loggedOutItems;
  };

  const content = (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar
          variant='rounded'
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to='/account'
        />
        <Typography className={classes.name} color='textPrimary' variant='h5'>
          {user.name}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {renderNavItems().map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor='left' classes={{ paper: classes.desktopDrawer }} open variant='persistent'>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
