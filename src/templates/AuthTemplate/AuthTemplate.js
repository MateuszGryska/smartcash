import React from 'react';
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
  imageContainer: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 0,
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
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.grid}
      >
        <div className={classes.logo}>
          <Typography className={classes.logoText}>SmartCash</Typography>
        </div>
        <Grid item mg={6} xs={6}>
          <Card className={classes.children}>{children}</Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthTemplate;
