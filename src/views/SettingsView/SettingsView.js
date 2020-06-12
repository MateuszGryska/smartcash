import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import AccountDetails from './components/AccountDetails';
import ProfileDetails from './components/ProfileDetails';
import PasswordSection from './components/PasswordSection';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  passwordSection: {
    marginTop: '20px',
  },
}));

const SettingsView = () => {
  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountDetails />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Grid item>
              <ProfileDetails />
            </Grid>
            <Grid className={classes.passwordSection} item>
              <PasswordSection />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </UserTemplate>
  );
};

export default SettingsView;
