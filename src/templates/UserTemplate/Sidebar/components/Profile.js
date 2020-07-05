import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
}));

const Profile = ({ className, user, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {user.image && (
            <Avatar
              className={classes.avatar}
              alt="Person Avatar"
              src={`http://localhost:5000/${user.image}`}
            />
          )}
          {!user.image && <Avatar className={classes.avatar} alt="Person Avatar" src="" />}
          <Typography className={classes.name} variant="h4">
            {user.firstName} {user.lastName}
          </Typography>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

Profile.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => {
  const { user, isLoading } = state.auth;
  return { user, isLoading };
};

export default connect(mapStateToProps)(Profile);
