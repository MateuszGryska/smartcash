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
  TableSortLabel,
  TablePagination,
} from '@material-ui/core';

import mockData from './data';
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
}));

const BudgetListTable = ({ searchItem }) => {
  const [bilanceItems] = useState(mockData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();
  /* eslint-disable */
  const handleSelectAll = (event) => {
    let selectedItems;

    if (event.target.checked) {
      selectedItems = bilanceItems.map((data) => data.id);
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

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === bilanceItems.length}
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 && selectedItems.length < bilanceItems.length
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
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bilanceItems
                  .filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <BudgetListTableItem
                      id={item.id}
                      name={item.name}
                      selectedItems={selectedItems}
                      date={item.date}
                      wallet={item.wallet}
                      price={item.price}
                      category={item.category}
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
          count={bilanceItems.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

BudgetListTable.propTypes = {
  searchItem: PropTypes.string,
};

BudgetListTable.defaultProps = {
  searchItem: '',
};

export default BudgetListTable;
