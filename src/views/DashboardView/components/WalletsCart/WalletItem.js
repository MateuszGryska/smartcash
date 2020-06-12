import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ListItem, Typography, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {},
  walletValue: {
    paddingRight: '25px',
    paddingLeft: '5px',
    color: theme.palette.success.main,
  },
}));

const WalletItem = ({ id, i, name, updatedAt, bilance, walletsLength }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem key={id} divider={i < walletsLength - 1}>
      <Typography variant="h3" className={classes.walletValue}>
        {bilance}
      </Typography>
      <ListItemText primary={name} secondary={`Updated ${updatedAt}`} />
      <IconButton edge="end" size="medium" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </ListItem>
  );
};

WalletItem.propTypes = {
  id: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  bilance: PropTypes.string.isRequired,
  walletsLength: PropTypes.number.isRequired,
};

export default WalletItem;
