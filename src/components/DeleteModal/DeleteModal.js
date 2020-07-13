import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

const DeleteModal = ({ open, handleClose, deleteFn }) => {
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
          Are you sure that you want to permanently delete this item?
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
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
};

export default DeleteModal;
