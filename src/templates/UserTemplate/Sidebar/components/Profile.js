import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const Profile = ({ user, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
              src={`${process.env.REACT_APP_ASSET_URL}${user.image}`}
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
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    phoneNumber: PropTypes.number,
    country: PropTypes.string,
    image: PropTypes.string,
    budgetElements: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
    wallets: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user, isLoading } = state.auth;
  return { user, isLoading };
};

export default connect(mapStateToProps)(Profile);
