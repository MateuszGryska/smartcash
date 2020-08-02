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
} from 'actions/index';
import { BudgetListModalSchema } from 'validation';
import { itemTypes } from 'helpers/itemTypes';

const EditBudgetElementModal = React.memo(
  ({
    open,
    handleClose,
    updateElement,
    fetchDataByUserId,
    id,
    wallets,
    categories,
    name,
    amount,
    type,
    isLoading,
    error,
  }) => {
    useEffect(() => {
      if (!wallets && !categories) {
        fetchDataByUserId(itemTypes.wallets);
        fetchDataByUserId(itemTypes.categories);
      }
      // eslint-disable-next-line
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title select-outlined-label"
      >
        <Formik
          initialValues={{ name, amount, wallet: '', category: '', type }}
          validationSchema={BudgetListModalSchema}
          onSubmit={async (values) => {
            await updateElement(itemTypes.budgetElements, id, values);
            if (!isLoading && error === null) {
              enqueueSnackbar('Updated element!', { variant: 'success' });
            }
            fetchDataByUserId(itemTypes.budgetElements);
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
                              {wallets.map((walletItem) => (
                                <MenuItem value={walletItem.id} key={walletItem.id}>
                                  {walletItem.name}
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
                                .filter((categoryItem) => categoryItem.type === values.type)
                                .map((categoryItem) => (
                                  <MenuItem value={categoryItem.id} key={categoryItem.id}>
                                    {categoryItem.name}
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
                    update
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

EditBudgetElementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateElement: PropTypes.func.isRequired,
  fetchDataByUserId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

EditBudgetElementModal.defaultProps = {
  error: null,
  wallets: [],
  categories: [],
};

const mapDispatchToProps = (dispatch) => ({
  updateElement: (itemType, id, content) => dispatch(updateElementAction(itemType, id, content)),
  fetchDataByUserId: (itemType) => dispatch(fetchDataByUserIdAction(itemType)),
});

const mapStateToProps = (state) => {
  const { wallets, categories, isLoading, error } = state.items;
  return { wallets, categories, isLoading, error };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetElementModal);
