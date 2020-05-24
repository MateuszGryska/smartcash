import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Hidden, IconButton, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

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
}));

const Topbar = ({ className, onSidebarOpen, ...rest }) => {
  const [notifications] = useState([]);
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} position="fixed">
      <Toolbar>
        <Typography variant="h3" color="inherit">
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
          <IconButton color="inherit">
            <MenuIcon fontSize="large" onClick={onSidebarOpen} />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
