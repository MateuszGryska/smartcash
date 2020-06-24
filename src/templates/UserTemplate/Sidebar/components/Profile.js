import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import avatar from '../../../../assets/images/avatar_1.png';

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
}));

const Profile = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar className={classes.avatar} alt="Person Avatar" src={avatar} />
      <Typography className={classes.name} variant="h4">
        {/* {`${users[0].firstName} ${users[0].lastName}`} */}
        Joe example
      </Typography>
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
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Profile);
