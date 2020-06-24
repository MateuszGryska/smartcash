import React, { useEffect } from 'react';
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
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import {
  addElement as addElementAction,
  fetchDataByUserId as fetchDataByUserIdAction,
} from '../../../actions/index';
import { BudgetListModalSchema } from '../../../validation';

const BudgetListModal = ({
  open,
  handleClose,
  addElement,
  fetchDataByUserId,
  wallets,
  categories,
}) => {
  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
    fetchDataByUserId('categories', 'categories');
  }, [fetchDataByUserId]);

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name: '', amount: '', wallet: '', category: '', type: '' }}
        validationSchema={BudgetListModalSchema}
        onSubmit={(values) => {
          addElement('budgetElements', values);
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
                      helperText={errors.name && touched.name ? errors.name : null}
                    />
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
                      helperText={errors.amount && touched.amount ? errors.amount : null}
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
                        helperText={errors.wallet && touched.wallet ? errors.wallet : null}
                      >
                        {wallets.map(({ id, name }) => (
                          <MenuItem value={id}>{name}</MenuItem>
                        ))}
                      </Select>
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
                        helperText={errors.category && touched.category ? errors.category : null}
                      >
                        {categories.map(({ id, name }) => (
                          <MenuItem value={id}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

const mapStateToProps = (state) => {
  const { wallets, categories } = state;
  return { wallets, categories };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListModal);
