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
import { addElement as addElementAction } from 'actions';
import { BudgetListModalSchema } from 'validation';
import { itemTypes } from 'helpers/itemTypes';

const BudgetListModal = React.memo(
  ({ open, handleClose, addElement, wallets, categories, isLoading, error }) => {
    const { enqueueSnackbar } = useSnackbar();

    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title select-outlined-label"
      >
        <Formik
          initialValues={{ name: '', amount: '', wallet: '', category: '', type: '' }}
          validationSchema={BudgetListModalSchema}
          onSubmit={async (values) => {
            await addElement(itemTypes.budgetElements, values);
            if (!isLoading && error === null) {
              enqueueSnackbar('Created new element!', { variant: 'success' });
            }
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
                        <FormHelperText error>
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
                        <FormHelperText error>
                          {errors.amount && touched.amount ? errors.amount : null}
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
                      {wallets.length > 0 && categories.length > 0 ? (
                        <>
                          <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel id="select-outlined-label">Wallet</InputLabel>
                            <Select
                              labelId="wallet"
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
                            <FormHelperText error>
                              {errors.wallet && touched.wallet ? errors.wallet : null}
                            </FormHelperText>
                          </FormControl>
                          <FormControl variant="outlined" fullWidth margin="dense" name="category">
                            <InputLabel id="select-outlined-label">Category</InputLabel>
                            <Select
                              labelId="category"
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
                            <FormHelperText error>
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

BudgetListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

BudgetListModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.items;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (itemType, content) => dispatch(addElementAction(itemType, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListModal);
