import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Divider,
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
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const MoneyCard = ({ moneyValue, accountName, updatedAt }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div>
          <Typography align="center" gutterBottom variant="h1">
            {moneyValue}
          </Typography>
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {accountName}
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
            <IconButton>
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
    </Card>
  );
};

export default MoneyCard;
