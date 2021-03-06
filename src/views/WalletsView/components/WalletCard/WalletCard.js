import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import EditWalletModal from 'views/WalletsView/components/EditWalletModal';
import DeleteModal from 'components/DeleteModal/DeleteModal';
import { itemTypes } from 'helpers/itemTypes';

import { deleteElement as deleteElementAction, clean as cleanUpAction } from 'actions';

const useStyles = makeStyles((theme) => ({
  root: {},
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const WalletCard = ({ sum, name, date, deleteElement, id, cleanUp }) => {
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
    await deleteElement(itemTypes.wallets, id);
    enqueueSnackbar('Deleted wallet!', { variant: 'success' });

    setDeleteModalVisibility(false);
  };

  // change format date
  const newDate = formatDistance(parseISO(date), new Date());

  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div>
          <Typography align="center" gutterBottom variant="h1">
            ${sum}
          </Typography>
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid item className={classes.statsItem}>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Updated {newDate} ago
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <IconButton onClick={() => setEditModalVisibility(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <EditWalletModal
        open={isEditModalVisible}
        handleClose={() => setEditModalVisibility(false)}
        id={id}
        name={name}
        sum={sum}
      />
      <DeleteModal
        open={isDeleteModalVisible}
        handleClose={handleClose}
        deleteFn={handleDeleteClick}
        cleanUp={cleanUp}
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
    </Card>
  );
};

WalletCard.propTypes = {
  sum: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  deleteElement: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  cleanUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),
  cleanUp: () => dispatch(cleanUpAction()),
});

export default connect(null, mapDispatchToProps)(WalletCard);
