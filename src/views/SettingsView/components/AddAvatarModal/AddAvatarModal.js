import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useSnackbar } from 'notistack';
import { updateUserImage as updateUserImageAction } from 'actions';

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'none',
  },
  avatar: {
    marginTop: '10px',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  button: {
    marginTop: '10px',
  },
}));

const AddAvatarModal = ({ open, handleClose, updateUserImage, isLoading, error }) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [isValid, setIsValid] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new window.FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const classes = useStyles();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const submitHandler = async () => {
    await updateUserImage(file);
    if (!isLoading && error === null) {
      enqueueSnackbar('Changed avatar!', { variant: 'success' });
    }
    handleClose();
  };

  const pickedHandler = ({ target }) => {
    let pickedFile;
    // eslint-disable-next-line
    let fileIsValid = isValid;
    if (target.files || target.files.length === 1) {
      // eslint-disable-next-line
      pickedFile = target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <>
        <DialogTitle id="max-width-dialog-title">Upload avatar.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload avatar, please choose avatar from your computer. Image must have maximum 0,5
            MB.
          </DialogContentText>
          <>
            <div className={classes.formControl}>
              {previewURL && <Avatar alt="preview" src={previewURL} className={classes.avatar} />}
              {!previewURL && <Avatar alt="preview" src="" className={classes.avatar} />}

              <input
                accept=".jpg,.png,.jpeg"
                id="raised-button-file"
                className={classes.input}
                multiple
                type="file"
                ref={filePickerRef}
                onChange={pickedHandler}
              />

              <Button component="span" onClick={pickImageHandler} className={classes.button}>
                Pick image
              </Button>
            </div>
            <Typography variant="body2" color="error">
              {error || null}
            </Typography>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary" disabled={!isValid}>
            Upload
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

AddAvatarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateUserImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

AddAvatarModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.items;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  updateUserImage: (image) => dispatch(updateUserImageAction(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAvatarModal);
