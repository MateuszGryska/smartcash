import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
// import { addElement as addElementAction } from '../../actions/index';
import { CategoriesModalSchema } from '../../validation';

const EditModal = ({ open, handleClose, addElement }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name: '' }}
        validationSchema={CategoriesModalSchema}
        onSubmit={(values) => {
          addElement('categories', values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <>
            <Form>
              <DialogTitle id="max-width-dialog-title">Edit element</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  To edit item, please change your title and value here.
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" type="submit" disabled={!isValid}>
                  Edit
                </Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // addElement: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
// });

// export default connect(null, mapDispatchToProps)(EditModal);
export default EditModal;
