import React, { useState } from 'react';
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

const ActiveModal = ({ open, handleClose, type, pageType }) => {
  const [wallet, setWallet] = useState('');
  const [category, setCategory] = useState('');

  const handleWalletChange = (event) => {
    setWallet(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
        {pageType === 'expenses' ? (
          <>
            <DialogTitle id="max-width-dialog-title">Add new expense.</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add new expense, please enter all data and value here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="text"
                variant="outlined"
                fullWidth
              />
              <FormControl variant="outlined" fullWidth margin="dense">
                <InputLabel id="demo-simple-select-outlined-label">Wallet</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={wallet}
                  onChange={handleWalletChange}
                  label="Wallet"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth margin="dense">
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Add
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="max-width-dialog-title">
              {type === 'add' ? 'Add new item' : 'Edit item'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {type === 'add'
                  ? 'To add new item, please enter your title and value here.'
                  : 'To edit item, please change your title and value here.'}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                margin="dense"
                id="moneyPrice"
                label="Value"
                type="text"
                variant="outlined"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                {type === 'add' ? 'Add' : 'Edit'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ActiveModal;
