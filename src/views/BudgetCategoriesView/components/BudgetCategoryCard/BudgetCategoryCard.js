import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import clsx from 'clsx';
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

import { deleteElement as deleteElementAction, clean as cleanUpAction } from 'actions';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';

import DeleteModal from 'components/DeleteModal';
import EditCategoryModal from 'views/BudgetCategoriesView/components/EditCategoryModal';

const useStyles = makeStyles((theme) => ({
  root: {},
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  income: {
    color: theme.palette.success.main,
  },
  expense: {
    color: theme.palette.error.main,
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const BudgetCategoryCard = ({ name, type, sum, date, deleteElement, cleanUp, id }) => {
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
    await deleteElement('categories', id);

    enqueueSnackbar('Deleted category!', { variant: 'success' });
    setDeleteModalVisibility(false);
  };

  const classes = useStyles();

  // change format date
  const newDate = formatDistance(parseISO(date), new Date());

  return (
    <Card>
      <CardContent>
        <div>
          <Typography
            align="center"
            gutterBottom
            variant="h1"
            className={clsx(type === 'income' ? classes.income : classes.expense)}
          >
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
      <DeleteModal
        open={isDeleteModalVisible}
        handleClose={handleClose}
        deleteFn={handleDeleteClick}
        cleanUp={cleanUp}
      />
      <EditCategoryModal
        open={isEditModalVisible}
        handleClose={() => setEditModalVisibility(false)}
        name={name}
        type={type}
        id={id}
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

BudgetCategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  deleteElement: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  cleanUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),

  cleanUp: () => dispatch(cleanUpAction()),
});

export default connect(null, mapDispatchToProps)(BudgetCategoryCard);
