import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

const DeleteModal = React.memo(
  ({ open, handleClose, deleteFn, user, cleanUp }) => {
    useEffect(() => {
      return () => {
        cleanUp();
      };
    }, [cleanUp]);
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>

        <DialogContent id="alert-dialog-description">
          <DialogContentText>
            {user
              ? 'Are you sure that you want to permanently delete your account?'
              : 'Are you sure that you want to permanently delete this item?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteFn} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.open === nextProps.open;
  },
);

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
};

export default DeleteModal;
