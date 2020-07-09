import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import SearchInput from 'components/SearchInput/SearchInput';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ handleOpen, handleSearchInputChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search..."
        />
        <div className={classes.spacer} />
        <Button color="primary" variant="contained" onClick={handleOpen}>
          New wallet
        </Button>
      </div>
      <div className={classes.row} />
    </div>
  );
};

Toolbar.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
};

export default Toolbar;
