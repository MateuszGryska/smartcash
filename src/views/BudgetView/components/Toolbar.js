import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import SearchInput from '../../../components/SearchInput/SearchInput';

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

const Toolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <SearchInput className={classes.searchInput} placeholder="Search..." />
        <div className={classes.spacer} />
        <Button color="primary" variant="contained">
          New category
        </Button>
      </div>
      <div className={classes.row} />
    </div>
  );
};

export default Toolbar;
