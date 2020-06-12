import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Hidden, IconButton, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    marginLeft: 5,
  },
}));

const Topbar = ({ className, onSidebarOpen, ...rest }) => {
  const [notifications] = useState([]);
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} position="fixed">
      <Toolbar>
        <MonetizationOnIcon style={{ fontSize: 30 }} />
        <Typography variant="h3" color="inherit" className={classes.logo}>
          SmartCash
        </Typography>
        <Hidden mdDown>
          <div className={classes.flexGrow} />
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon fontSize="large" />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <div className={classes.flexGrow} />
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

Topbar.defaultProps = {
  className: '',
};

export default Topbar;
