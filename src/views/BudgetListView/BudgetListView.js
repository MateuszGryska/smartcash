import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BudgetListTable from './components/BudgetListTable';
import Toolbar from './components/Toolbar';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import BudgetListModal from './components/BudgetListModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const BudgetListView = () => {
  const [searchItem, setSearchItem] = useState('');
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarVisibility(false);
  };

  const classes = useStyles();

  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar
          handleOpen={() => setModalVisibility(true)}
          handleSearchInputChange={handleSearchInputChange}
        />
        <div className={classes.content}>
          <BudgetListTable searchItem={searchItem} />
        </div>
        <BudgetListModal
          open={isModalVisible}
          handleClose={() => setModalVisibility(false)}
          setSnackbarVisibility={setSnackbarVisibility}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackbarVisible}
          autoHideDuration={4000}
          onClose={handleClose}
          message="New item added!"
          action={
            <>
              <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </>
          }
        />
      </div>
    </UserTemplate>
  );
};

export default BudgetListView;
