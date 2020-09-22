import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import DeleteModal from 'components/DeleteModal';
import { AccountDetails, ProfileDetails, PasswordSection } from 'views/SettingsView/components';

import {
  getUserById as getUserByIdAction,
  deleteUser as deleteUserAction,
  logout as logoutAction,
  clean as cleanUpAction,
} from 'actions';

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
  deleteButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const SettingsView = ({ getUserById, deleteUser, logout, user, isLoading, cleanUp }) => {
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getUserById();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      logout();
    } catch (err) {
      enqueueSnackbar(`${err}`, { variant: 'error' });
    }
  };

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <article className={classes.root}>
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
              <Grid item className={classes.deleteButton}>
                <Button onClick={() => setDeleteModalVisibility(true)}>Delete your account</Button>
                <DeleteModal
                  user
                  handleClose={() => setDeleteModalVisibility(false)}
                  deleteFn={handleDeleteUser}
                  open={isDeleteModalVisible}
                  cleanUp={cleanUp}
                />
              </Grid>
            </Grid>
          </Grid>
        </article>
      )}
    </>
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
  }),
  isLoading: PropTypes.bool.isRequired,
  deleteUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
};

SettingsView.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const { user, isLoading } = state.auth;
  return { user, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  getUserById: () => dispatch(getUserByIdAction()),
  deleteUser: () => dispatch(deleteUserAction()),
  cleanUp: () => dispatch(cleanUpAction()),
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
