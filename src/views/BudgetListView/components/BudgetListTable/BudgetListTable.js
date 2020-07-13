import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TableSortLabel,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';

import BudgetListTableItem from 'views/BudgetListView/components/BudgetListTableItem';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// const BudgetListTable = ({ searchItem, budgetElements, wallets, categories, error, isLoading }) => {
const BudgetListTable = ({ searchItem, budgetElements, wallets, categories }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();
  /* eslint-disable */
  const handleSelectAll = (event) => {
    let selectedItems;

    if (event.target.checked) {
      selectedItems = budgetElements.map((data) => data.id);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };
  /* eslint-enable */

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1),
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handlePageChange = (event, currentPage) => {
    setPage(currentPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const getWalletName = (walletId) => {
    if (wallets) {
      const walletName = wallets.find((wallet) => wallet.id === walletId);
      return walletName.name;
    }
    return 'ERROR';
  };
  const getCategoryName = (categoryId) => {
    if (categories) {
      const categoryName = categories.find((category) => category.id === categoryId);
      return categoryName.name;
    }
    return 'ERROR';
  };

  return (
    <Card className={classes.root}>
      {' '}
      <>
        {!budgetElements ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <CardContent className={classes.content}>
              {budgetElements.length > 0 ? (
                <PerfectScrollbar>
                  <div className={classes.inner}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedItems.length === budgetElements.length}
                              color="primary"
                              indeterminate={
                                selectedItems.length > 0 &&
                                selectedItems.length < budgetElements.length
                              }
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell sortDirection="desc">
                            <Tooltip enterDelay={300} title="Sort">
                              <TableSortLabel active direction="desc">
                                Date
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Wallet</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {budgetElements
                          .filter((item) =>
                            item.name.toLowerCase().includes(searchItem.toLowerCase()),
                          )
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(({ _id: id, name, date, wallet, amount, category, type }) => (
                            <BudgetListTableItem
                              key={id}
                              id={id}
                              name={name}
                              selectedItems={selectedItems}
                              date={date}
                              type={type}
                              wallet={getWalletName(wallet)}
                              amount={amount}
                              category={getCategoryName(category)}
                              handleSelectOne={handleSelectOne}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              ) : (
                <Typography align="center" variant="h3">
                  You don&#39;t have any data, add new one!
                </Typography>
              )}
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <TablePagination
                component="div"
                count={budgetElements.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </CardActions>
          </>
        )}
      </>
    </Card>
  );
};

BudgetListTable.propTypes = {
  searchItem: PropTypes.string,
  budgetElements: PropTypes.arrayOf(PropTypes.object),
  wallets: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
};

BudgetListTable.defaultProps = {
  searchItem: '',
  budgetElements: [],
  wallets: [],
  categories: [],
};

export default BudgetListTable;
