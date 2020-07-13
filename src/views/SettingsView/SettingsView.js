import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import UserTemplate from 'templates/UserTemplate/UserTemplate';
import { AccountDetails, ProfileDetails, PasswordSection } from 'views/SettingsView/components';

import { getUserById as getUserByIdAction } from 'actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  passwordSection: {
    marginTop: '20px',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
}));

const SettingsView = ({ getUserById, user, isLoading }) => {
  useEffect(() => {
    getUserById();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <UserTemplate>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountDetails userData={user} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <Grid item>
                <ProfileDetails userData={user} />
              </Grid>
              <Grid className={classes.passwordSection} item>
                <PasswordSection />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </UserTemplate>
  );
};

SettingsView.propTypes = {
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user, isLoading } = state.auth;
  return { user, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  getUserById: () => dispatch(getUserByIdAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
