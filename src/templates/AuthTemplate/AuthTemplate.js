import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100vh',
  },
  logoText: {
    fontSize: '48px',
    marginBottom: '50px',
  },
  children: {
    minHeight: '640px',
    maxWidth: '400px',
    minWidth: '400px',
  },
  appName: {
    position: 'absolute',
    bottom: '30px',
    right: '20px',
    color: theme.palette.white,
    fontWeight: 'bold',
    fontSize: '48px',
  },
}));

const AuthTemplate = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.grid}
      >
        <Grid item className={classes.logo}>
          <Typography className={classes.logoText}>SmartCash</Typography>
        </Grid>
        <Grid item>
          <Card className={classes.children}>{children}</Card>
        </Grid>
      </Grid>
    </main>
  );
};

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
