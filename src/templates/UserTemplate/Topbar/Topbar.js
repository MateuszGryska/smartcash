import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Hidden, IconButton, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import { logout as logoutAction } from 'actions';

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
    textDecoration: 'none',
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'row',
  },
  logoName: {
    marginLeft: 5,
  },
}));

const Topbar = ({ onSidebarOpen, logout }) => {
  const [notifications] = useState([]);
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <>
          <Link to="/dashboard" className={classes.logo}>
            <MonetizationOnIcon style={{ fontSize: 30 }} />
            <Typography variant="h3" color="inherit" className={classes.logoName}>
              SmartCash
            </Typography>
          </Link>
          <Hidden mdDown>
            <div className={classes.flexGrow} />
            <IconButton color="inherit">
              <Badge badgeContent={notifications.length} color="primary" variant="dot">
                <NotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
            <IconButton
              as={Link}
              to="/login"
              className={classes.signOutButton}
              color="inherit"
              onClick={() => logout()}
            >
              <InputIcon fontSize="large" />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <div className={classes.flexGrow} />
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <IconButton
              as={Link}
              to="/login"
              className={classes.signOutButton}
              color="inherit"
              onClick={() => logout()}
            >
              <InputIcon fontSize="large" />
            </IconButton>
          </Hidden>
        </>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Topbar);
