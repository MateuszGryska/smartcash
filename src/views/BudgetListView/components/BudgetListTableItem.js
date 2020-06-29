import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, TableCell, TableRow, IconButton, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import EditModal from '../../../components/EditModal/EditModal';

import { deleteElement as deleteElementAction } from '../../../actions';

const BudgetListTableItem = ({
  id,
  selectedItems,
  date,
  name,
  wallet,
  amount,
  category,
  handleSelectOne,
  deleteElement,
}) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    deleteElement('budgetElements', id);
    setAnchorEl(null);
  };

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
      <TableCell>{date}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{wallet}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>
        <IconButton edge="end" size="medium" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <IconButton edge="end" size="medium" onClick={() => setModalVisibility(true)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <EditModal open={isModalVisible} handleClose={() => setModalVisibility(false)} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
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
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(BudgetListTableItem);
