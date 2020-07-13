import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import {
  updateElement as updateElementAction,
  fetchDataByUserId as fetchDataByUserIdAction,
} from 'actions';
import { WalletsModalSchema } from 'validation';

const EditWalletModal = ({
  open,
  handleClose,
  id,
  name,
  sum,
  updateElement,
  fetchDataByUserId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name, sum }}
        validationSchema={WalletsModalSchema}
        onSubmit={async (values) => {
          await updateElement('wallets', id, values);
          enqueueSnackbar('Updated wallet!', { variant: 'success' });
          fetchDataByUserId('wallets', 'wallets');
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <>
            <Form>
              <DialogTitle id="max-width-dialog-title">Edit wallet</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  To update wallet, please enter your name and bilance here.
                </DialogContentText>
                <FormControl variant="outlined" fullWidth margin="dense">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name && touched.name}
                  />
                  <FormHelperText>
                    {errors.name && touched.name ? errors.name : null}
                  </FormHelperText>
                </FormControl>
                <FormControl variant="outlined" fullWidth margin="dense">
                  <TextField
                    margin="dense"
                    id="sum"
                    name="sum"
                    label="Bilance"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sum}
                    error={errors.sum && touched.sum}
                  />
                  <FormHelperText>{errors.sum && touched.sum ? errors.sum : null}</FormHelperText>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" type="submit" disabled={!isValid}>
                  Update
                </Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

EditWalletModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateElement: (itemType, id, content) => dispatch(updateElementAction(itemType, id, content)),
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

export default connect(null, mapDispatchToProps)(EditWalletModal);
