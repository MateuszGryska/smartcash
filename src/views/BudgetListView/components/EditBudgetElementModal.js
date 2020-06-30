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
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { updateElement as updateElementAction } from '../../../actions/index';
import { BudgetListModalSchema } from '../../../validation';

const EditBudgetElementModal = ({
  open,
  handleClose,
  updateElement,
  id,
  wallets,
  categories,
  name,
  amount,
  wallet,
  category,
  type,
}) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <Formik
        initialValues={{ name, amount, wallet, category, type }}
        validationSchema={BudgetListModalSchema}
        onSubmit={(values) => {
          updateElement('budgetElements', id, values);
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
                        {wallets.map((props) => (
                          <MenuItem value={props.id} key={props.id}>
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
                        {categories.map((props) => (
                          <MenuItem value={props.id} key={props.id}>
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
});

const mapStateToProps = (state) => {
  const { wallets, categories } = state.items;
  return { wallets, categories };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetElementModal);
