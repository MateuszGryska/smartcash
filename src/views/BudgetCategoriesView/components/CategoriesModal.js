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
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { addElement as addElementAction } from '../../../actions/index';
import { CategoriesModalSchema } from '../../../validation';

const CategoriesModal = ({ open, handleClose, addElement }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name: '', type: '', sum: 0 }}
        validationSchema={CategoriesModalSchema}
        onSubmit={(values) => {
          addElement('categories', values);
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
                  helperText={errors.name && touched.name ? errors.name : null}
                  fullWidth
                />
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
                    helperText={errors.type && touched.type ? errors.type : null}
                  >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </FormControl>
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
};

CategoriesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
});

export default connect(null, mapDispatchToProps)(CategoriesModal);
