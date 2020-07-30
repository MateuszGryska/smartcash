import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="body1">&copy; SmartCash</Typography>
    </footer>
  );
};

export default Footer;
