import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import AccountDetails from './components/AccountDetails';
import ProfileDetails from './components/ProfileDetails';
import PasswordSection from './components/PasswordSection';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const SettingsView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing="4">
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountDetails />
        </Grid>
        <Grid container spacing="4">
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <ProfileDetails />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <PasswordSection />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsView;
