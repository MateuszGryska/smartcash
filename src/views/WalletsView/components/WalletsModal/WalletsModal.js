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
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import { addElement as addElementAction } from 'actions/index';
import { WalletsModalSchema } from 'validation';
import { itemTypes } from 'helpers/itemTypes';

const WalletsModal = React.memo(
  ({ open, handleClose, addElement, isLoading, error }) => {
    const { enqueueSnackbar } = useSnackbar();
    return (
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
        <Formik
          initialValues={{ name: '', sum: '' }}
          validationSchema={WalletsModalSchema}
          onSubmit={async (values) => {
            await addElement(itemTypes.wallets, values);
            if (!isLoading && error === false) {
              enqueueSnackbar('Created new wallet!', { variant: 'success' });
            }
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <>
              <Form>
                <DialogTitle id="max-width-dialog-title">Add new wallet</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    To add new wallet, please enter your name and bilance here.
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
                    <FormHelperText error>
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
                    <FormHelperText error>
                      {errors.sum && touched.sum ? errors.sum : null}
                    </FormHelperText>
                  </FormControl>
                  <Typography variant="body2" color="error">
                    {error || null}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary" type="submit" disabled={!isValid}>
                    Add
                  </Button>
                </DialogActions>
              </Form>
            </>
          )}
        </Formik>
      </Dialog>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.open === nextProps.open;
  },
);

WalletsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

WalletsModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.items;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsModal);
