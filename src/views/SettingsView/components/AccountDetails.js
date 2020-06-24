import React from 'react';
import { connect } from 'react-redux';
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

const AccountDetails = ({ users }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {`${users[0].firstName} ${users[0].lastName}`}
            </Typography>
            <Typography variant="body2">{users[0].country}</Typography>
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

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(AccountDetails);
