import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import avatar from '../../../assets/images/avatar_1.png';

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: 'flex',
  },

  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountDetails = ({ userData }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body2">{userData.country}</Typography>
          </div>
          <Avatar className={classes.avatar} alt="Person Avatar" src={avatar} />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} variant="text">
          Upload Picture
        </Button>
        <Button variant="text">remove Picture</Button>
      </CardActions>
    </Card>
  );
};

export default AccountDetails;
