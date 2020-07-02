import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import { fetchDataByUserId as fetchDataByUserIdAction } from '../../../actions';
import BudgetListTableItem from './BudgetListTableItem';

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

const BudgetListTable = ({
  searchItem,
  budgetElements,
  wallets,
  categories,
  fetchDataByUserId,
  error,
  isLoading,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
    fetchDataByUserId('categories', 'categories');
    fetchDataByUserId('budgetElements', 'budgetElements');
  }, [fetchDataByUserId]);

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
    const walletName = wallets.find((wallet) => wallet.id === walletId);
    return walletName.name;
  };
  const getCategoryName = (categoryId) => {
    const categoryName = categories.find((category) => category.id === categoryId);
    return categoryName.name;
  };

  let renderData;
  if (isLoading) {
    renderData = (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  } else if (error !== null || !budgetElements) {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any data! Add new one!
      </Typography>
    );
  } else if (budgetElements.length > 0) {
    renderData = (
      <>
        <CardContent className={classes.content}>
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
                          selectedItems.length > 0 && selectedItems.length < budgetElements.length
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
                    .filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
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
    );
  } else {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any data, add new one!
      </Typography>
    );
  }

  return <Card className={classes.root}>{renderData}</Card>;
};

BudgetListTable.propTypes = {
  searchItem: PropTypes.string,
};

BudgetListTable.defaultProps = {
  searchItem: '',
};

const mapStateToProps = (state) => {
  const { budgetElements, wallets, categories, error, isLoading } = state.items;
  return { budgetElements, wallets, categories, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListTable);
