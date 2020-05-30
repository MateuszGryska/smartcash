import React from 'react';
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
        Joe Example
      </Typography>
    </div>
  );
};

export default Profile;
