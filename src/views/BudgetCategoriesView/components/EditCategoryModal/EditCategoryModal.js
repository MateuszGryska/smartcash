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
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import {
  updateElement as updateElementAction,
  fetchDataByUserId as fetchDataByUserIdAction,
} from 'actions';

import { CategoriesModalSchema } from 'validation';

const EditCategoryModal = ({
  open,
  handleClose,
  name,
  type,
  updateElement,
  fetchDataByUserId,
  id,
  isLoading,
  error,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name, type }}
        validationSchema={CategoriesModalSchema}
        onSubmit={async (values) => {
          await updateElement('categories', id, values);
          if (!isLoading && error === null) {
            enqueueSnackbar('Updated category!', { variant: 'success' });
          }
          fetchDataByUserId('categories', 'categories');
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <>
            <Form>
              <DialogTitle id="max-width-dialog-title">Edit category</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  To edit category, please enter name and type here.
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
                  <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
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
                  <FormHelperText>
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

EditCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateElement: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fetchDataByUserId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

EditCategoryModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.items;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  updateElement: (itemType, id, content) => dispatch(updateElementAction(itemType, id, content)),
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);
