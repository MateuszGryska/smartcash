import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import CategoriesModal from './CategoriesModal';

import { deleteElement as deleteElementAction } from '../../../actions';

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

const BudgetCategoryCard = ({ name, type, sum, date, deleteElement, id }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    deleteElement('categories', id);
    setAnchorEl(null);
  };

  const classes = useStyles();

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
              {date}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <IconButton onClick={() => setModalVisibility(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <CategoriesModal
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
    </Card>
  );
};

BudgetCategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteElement: (itemType, id) => dispatch(deleteElementAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(BudgetCategoryCard);
