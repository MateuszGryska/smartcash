import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import WalletItem from './WalletItem';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
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
            <WalletItem
              id={wallet.id}
              i={i}
              name={wallet.name}
              updatedAt={wallet.updatedAt}
              bilance={wallet.bilance}
              walletsLength={wallets.length}
            />
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="large" variant="text" component={Link} to="/wallets">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default WalletsCart;
