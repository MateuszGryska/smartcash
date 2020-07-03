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
  CircularProgress,
  FormHelperText,
  Typography,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import { addElement as addElementAction } from '../../../actions/index';
import { BudgetListModalSchema } from '../../../validation';

const BudgetListModal = ({ open, handleClose, addElement, wallets, categories }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name: '', amount: '', wallet: '', category: '', type: '' }}
        validationSchema={BudgetListModalSchema}
        onSubmit={(values) => {
          addElement('budgetElements', values);
          enqueueSnackbar('Created new element!', { variant: 'success' });
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <>
            <DialogTitle id="max-width-dialog-title">Add new expense.</DialogTitle>
            <Form>
              <DialogContent>
                <DialogContentText>
                  To add new expense, please enter all data and value here.
                </DialogContentText>
                {categories && wallets ? (
                  <>
                    <FormControl variant="outlined" fullWidth margin="dense">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        fullWidth
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
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                        error={errors.amount && touched.amount}
                      />
                      <FormHelperText>
                        {errors.amount && touched.amount ? errors.amount : null}
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
                    {wallets.length > 0 && categories.length > 0 ? (
                      <>
                        <FormControl variant="outlined" fullWidth margin="dense">
                          <InputLabel id="demo-simple-select-outlined-label">Wallet</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="wallet"
                            label="Wallet"
                            name="wallet"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.wallet}
                            error={errors.wallet && touched.wallet}
                          >
                            {wallets.map(({ id, name }) => (
                              <MenuItem value={id} key={id}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.wallet && touched.wallet ? errors.wallet : null}
                          </FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth margin="dense" name="category">
                          <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="category"
                            label="Category"
                            name="category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            error={errors.category && touched.category}
                          >
                            {categories
                              .filter((category) => category.type === values.type)
                              .map(({ id, name }) => (
                                <MenuItem value={id} key={id}>
                                  {name}
                                </MenuItem>
                              ))}
                          </Select>
                          <FormHelperText>
                            {errors.category && touched.category ? errors.category : null}
                          </FormHelperText>
                        </FormControl>
                      </>
                    ) : (
                      <Typography align="center" color="error" variant="h3">
                        You must add new wallet and new category to continue!
                      </Typography>
                    )}
                  </>
                ) : (
                  <CircularProgress />
                )}
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

BudgetListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
});

export default connect(null, mapDispatchToProps)(BudgetListModal);
