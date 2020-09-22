import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Box } from '@material-ui/core';
import { CSVLink } from 'react-csv';

import SearchInput from 'components/SearchInput/SearchInput';
import { getName } from 'utils';

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
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  CSVLink: {
    color: 'black',
  },
}));

const Toolbar = ({ handleOpen, handleSearchInputChange, budgetElements, wallets, categories }) => {
  const [convertedBudgetElements, addConvertedBudgetElements] = useState([]);

  // convert data for CSV
  const convertBudgetElements = () => {
    const convertedData = [];
    budgetElements.forEach((budgetElement) => {
      const wallet = getName(budgetElement.wallet, wallets);
      const category = getName(budgetElement.category, categories);
      convertedData.push({ ...budgetElement, wallet, category });
    });
    addConvertedBudgetElements(convertedData);
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <menu className={classes.row}>
        <span className={classes.spacer} />
        <Button
          className={classes.exportButton}
          disabled={!budgetElements}
          onClick={() => convertBudgetElements()}
        >
          <CSVLink
            data={convertedBudgetElements}
            filename="budget-elements"
            className={classes.CSVLink}
          >
            Export
          </CSVLink>
        </Button>
        <Button onClick={handleOpen} color="primary" variant="contained">
          Add new
        </Button>
      </menu>

      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search..."
        />
      </div>
    </Box>
  );
};

Toolbar.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
  budgetElements: PropTypes.arrayOf(PropTypes.object),
  wallets: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
};

Toolbar.defaultProps = {
  budgetElements: [],
  wallets: [],
  categories: [],
};
export default Toolbar;
