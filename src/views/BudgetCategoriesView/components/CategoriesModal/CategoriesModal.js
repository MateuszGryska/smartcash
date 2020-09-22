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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import { addElement as addElementAction } from 'actions';
import { CategoriesModalSchema } from 'validation';
import { itemTypes } from 'helpers/itemTypes';

const CategoriesModal = React.memo(
  ({ open, handleClose, addElement, isLoading, error }) => {
    const { enqueueSnackbar } = useSnackbar();

    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title select-outlined-label"
      >
        <Formik
          initialValues={{ name: '', type: '' }}
          validationSchema={CategoriesModalSchema}
          onSubmit={async (values) => {
            await addElement(itemTypes.categories, values);
            if (!isLoading && error === false) {
              enqueueSnackbar('Created new category!', { variant: 'success' });
            }
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <>
              <Form>
                <DialogTitle id="max-width-dialog-title">Add new category</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    To add new category, please enter name and type here.
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
                    <InputLabel id="select-outlined-label">Type</InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      name="type"
                      label="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      error={errors.type && touched.type}
                    >
                      <MenuItem value="income">Income</MenuItem>
                      <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                    <FormHelperText error>
                      {errors.type && touched.type ? errors.type : null}
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

CategoriesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

CategoriesModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.items;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal);
