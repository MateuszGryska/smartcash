import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import AddAvatarModal from 'views/SettingsView/components/AddAvatarModal';

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
  const [isUploadModalVisible, setUploadModalVisibility] = useState(false);
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
          {userData.image && (
            <Avatar
              className={classes.avatar}
              alt="Person Avatar"
              src={`${process.env.REACT_APP_ASSET_URL}${userData.image}`}
            />
          )}
          {!userData.image && <Avatar className={classes.avatar} alt="Profile avatar" src="" />}
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          variant="text"
          onClick={() => setUploadModalVisibility(true)}
        >
          Upload Picture
        </Button>
      </CardActions>
      <AddAvatarModal
        open={isUploadModalVisible}
        handleClose={() => setUploadModalVisibility(false)}
      />
    </Card>
  );
};

AccountDetails.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
};

AccountDetails.defaultProps = {
  userData: {
    firstName: '',
    lastName: '',
    image: '',
    country: '',
  },
};

export default AccountDetails;
