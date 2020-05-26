import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    paddingBottom: '30px',
  },
  content: {
    padding: 0,
  },
  walletValue: {
    paddingRight: '25px',
    paddingLeft: '5px',
    color: theme.palette.success.main,
  },
  actions: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
}));

const WalletsCart = () => {
  const [wallets] = useState(mockData);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Wallets" />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {wallets.map((wallet, i) => (
            <ListItem key={wallet.id} divider={i < wallets.length - 1}>
              <Typography variant="h3" className={classes.walletValue}>
                $5000
              </Typography>
              <ListItemText primary={wallet.name} secondary={`Updated ${wallet.updatedAt}`} />
              <IconButton edge="end" size="large">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" size="large" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default WalletsCart;
