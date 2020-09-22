import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import {
  Checkbox,
  TableCell,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import EditBudgetElementModal from 'views/BudgetListView/components/EditBudgetElementModal';
import DeleteModal from 'components/DeleteModal';

import { deleteElement as deleteElementAction, clean as cleanUpAction } from 'actions';
import { itemTypes } from 'helpers/itemTypes';

const BudgetListTableItem = ({
  id,
  selectedItems,
  date,
  name,
  wallet,
  type,
  amount,
  category,
  handleSelectOne,
  deleteElement,
  cleanUp,
}) => {
  const [isEditModalVisible, setEditModalVisibility] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteModalVisibility(false);
  };

  const handleDeleteClick = async () => {
    await deleteElement(itemTypes.budgetElements, id);
    enqueueSnackbar('Deleted element!', { variant: 'success' });
    setDeleteModalVisibility(false);
  };

  // change format date
  const newDate = format(parseISO(date), 'dd.MM.yyyy');

  return (
    <TableRow hover key={id} selected={selectedItems.indexOf(id) !== -1}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf(id) !== -1}
          color="primary"
          onChange={(event) => handleSelectOne(event, id)}
          value="true"
        />
      </TableCell>
      <TableCell>{newDate}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{wallet}</TableCell>
      <TableCell align="right">
        {type === 'income' ? (
          <Typography color="inherit">${amount}</Typography>
        ) : (
          <Typography color="error">${amount}</Typography>
        )}
      </TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>
        <IconButton edge="end" size="medium" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <IconButton edge="end" size="medium" onClick={() => setEditModalVisibility(true)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <DeleteModal
        open={isDeleteModalVisible}
        handleClose={handleClose}
        deleteFn={handleDeleteClick}
        cleanUp={cleanUp}
      />
      <EditBudgetElementModal
        name={name}
        id={id}
        wallet={wallet}
        amount={amount}
        category={category}
        type={type}
        open={isEditModalVisible}
        handleClose={() => setEditModalVisibility(false)}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setDeleteModalVisibility(true)}>Delete</MenuItem>
      </Menu>
    </TableRow>
  );
};

BudgetListTableItem.propTypes = {
  id: PropTypes.string.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  wallet: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  handleSelectOne: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  deleteElement: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),
  cleanUp: () => dispatch(cleanUpAction()),
});

export default connect(null, mapDispatchToProps)(BudgetListTableItem);
