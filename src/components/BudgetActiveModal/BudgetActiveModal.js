import React from 'react';
import PropTypes from 'prop-types';
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
import { BudgetActiveModalSchema } from '../../validation';

const BudgetActiveModal = ({ open, handleClose }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name: '', amount: '', wallet: '', category: '', type: '' }}
        validationSchema={BudgetActiveModalSchema}
        onSubmit={(values) => {
          console.log(values);
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
                    <MenuItem value="15eef32769a68458ec7090f4f">Cash</MenuItem>
                    <MenuItem value="25eef32769a68458ec7090f4f">PKO</MenuItem>
                    <MenuItem value="35eef32769a68458ec7090f4f">ING</MenuItem>
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
                    <MenuItem value="5eef32769a68458ec7090f4f">Food</MenuItem>
                    <MenuItem value="55eef32769a68458ec7090f4f">Water</MenuItem>
                    <MenuItem value="35eef32769a68458ec7090f4f">apples</MenuItem>
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

BudgetActiveModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BudgetActiveModal;
