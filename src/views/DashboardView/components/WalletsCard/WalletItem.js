import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { formatDistance } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { ListItem, Typography, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';

import { deleteElement as deleteElementAction } from '../../../../actions';

const useStyles = makeStyles((theme) => ({
  root: {},
  walletValue: {
    paddingRight: '25px',
    paddingLeft: '5px',
    color: theme.palette.success.main,
  },
}));

const WalletItem = ({
  id,
  index,
  name,
  date,
  sum,
  walletsLength,
  deleteElement,
  budgetElements,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteModalVisibility(false);
  };

  const handleDeleteClick = () => {
    if (budgetElements.length > 0) {
      enqueueSnackbar('Delete budget items before deleting the wallet!', {
        variant: 'warning',
      });
    } else {
      deleteElement('wallets', id);
      enqueueSnackbar('Deleted wallet!', { variant: 'success' });
    }

    setDeleteModalVisibility(false);
  };

  // change format date
  const newDate = formatDistance(parseISO(date), new Date());

  return (
    <ListItem key={id} divider={index < walletsLength - 1}>
      <Typography variant="h3" className={classes.walletValue}>
        ${sum}
      </Typography>
      <ListItemText primary={name} secondary={`Updated ${newDate} ago`} />
      <IconButton edge="end" size="medium" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <DeleteModal
        open={isDeleteModalVisible}
        handleClose={handleClose}
        deleteFn={handleDeleteClick}
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
    </ListItem>
  );
};

WalletItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  walletsLength: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(WalletItem);
