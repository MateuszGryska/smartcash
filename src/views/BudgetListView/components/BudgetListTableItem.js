import React, { useState } from 'react';
import { Checkbox, TableCell, TableRow, IconButton, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import ActiveModal from '../../../components/ActiveModal/ActiveModal';

const BudgetListTableItem = ({
  id,
  selectedItems,
  date,
  name,
  wallet,
  price,
  category,
  handleSelectOne,
}) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
      <TableCell>{price}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>
        <IconButton edge="end" size="medium" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <IconButton edge="end" size="medium" onClick={() => setModalVisibility(true)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <ActiveModal
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
        type="edit"
      />
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

export default BudgetListTableItem;
