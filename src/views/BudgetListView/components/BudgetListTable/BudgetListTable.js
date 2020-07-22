import React, { useState } from 'react';
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
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import BudgetListTableItem from 'views/BudgetListView/components/BudgetListTableItem';
import DeleteModal from 'components/DeleteModal';
import { getName } from 'utils';

import { deleteElements as deleteElementsAction, clean as cleanUpAction } from 'actions';

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
    justifyContent: 'space-between',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// const BudgetListTable = ({ searchItem, budgetElements, wallets, categories, error, isLoading }) => {
const BudgetListTable = ({
  searchItem,
  budgetElements,
  wallets,
  categories,
  deleteElements,
  cleanUp,
}) => {
  // table hooks
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // delete hooks
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  /* eslint-disable */

  // handle selected items
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

  // handle delete selected items

  const handleDeleteModalClose = () => {
    setDeleteModalVisibility(false);
  };

  const handleDeleteClick = async () => {
    await deleteElements('budgetElements', selectedItems);
    enqueueSnackbar('Deleted elements!', { variant: 'warning' });
    setDeleteModalVisibility(false);
    setSelectedItems([]);
  };

  // change id to name
  // const getName = (itemId, itemType) => {
  //   if (categories) {
  //     const itemName = itemType.find((item) => item.id === itemId);
  //     return itemName.name;
  //   }
  //   return 'Item name cannot be added!';
  // };

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
                          .filter(
                            ({ name, category, wallet }) =>
                              name.toLowerCase().includes(searchItem.toLowerCase()) ||
                              getName(category, categories)
                                .toLowerCase()
                                .includes(searchItem.toLowerCase()) ||
                              getName(wallet, wallets)
                                .toLowerCase()
                                .includes(searchItem.toLowerCase()),
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
                              wallet={getName(wallet, wallets)}
                              amount={amount}
                              category={getName(category, categories)}
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
              <Button
                onClick={() => setDeleteModalVisibility(true)}
                color="primary"
                variant="contained"
                disabled={selectedItems.length === 0}
              >
                Delete selected
              </Button>
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
            <DeleteModal
              open={isDeleteModalVisible}
              handleClose={handleDeleteModalClose}
              deleteFn={handleDeleteClick}
              cleanUp={cleanUp}
            />
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

const mapDispatchToProps = (dispatch) => ({
  deleteElements: (itemType, id) => dispatch(deleteElementsAction(itemType, id)),
  cleanUp: () => dispatch(cleanUpAction()),
});

export default connect(null, mapDispatchToProps)(BudgetListTable);
