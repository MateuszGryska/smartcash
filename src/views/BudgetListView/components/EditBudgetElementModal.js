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
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import {
  updateElement as updateElementAction,
  fetchDataByUserId as fetchDataByUserIdAction,
} from '../../../actions/index';
import { BudgetListModalSchema } from '../../../validation';

const EditBudgetElementModal = ({
  open,
  handleClose,
  updateElement,
  fetchDataByUserId,
  id,
  wallets,
  categories,
  name,
  amount,
  wallet,
  category,
  type,
}) => {
  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
    fetchDataByUserId('categories', 'categories');
    // eslint-disable-next-line
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name, amount, wallet, category, type }}
        validationSchema={BudgetListModalSchema}
        onSubmit={(values) => {
          updateElement('budgetElements', id, values);
          enqueueSnackbar('Updated element!', { variant: 'success' });
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
                            {wallets.map((walletItem) => (
                              <MenuItem value={walletItem.id} key={walletItem.id}>
                                {walletItem.name}
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
                              .filter((categoryItem) => categoryItem.type === values.type)
                              .map((categoryItem) => (
                                <MenuItem value={categoryItem.id} key={categoryItem.id}>
                                  {categoryItem.name}
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
                  update
                </Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

EditBudgetElementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateElement: (itemType, id, content) => dispatch(updateElementAction(itemType, id, content)),
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

const mapStateToProps = (state) => {
  const { wallets, categories } = state.items;
  return { wallets, categories };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetElementModal);
