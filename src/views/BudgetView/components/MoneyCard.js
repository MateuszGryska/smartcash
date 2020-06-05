import React, { useState } from 'react';
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
import ActiveModal from '../../../components/ActiveModal/ActiveModal';

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

const MoneyCard = ({ categoryName, categoryType, sumAll, updatedAt }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
            className={clsx(categoryType === 'income' ? classes.income : classes.expense)}
          >
            {sumAll}
          </Typography>
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {categoryName}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid item className={classes.statsItem}>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {updatedAt}
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
    </Card>
  );
};

export default MoneyCard;
