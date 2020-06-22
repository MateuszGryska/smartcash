import React, { useState } from 'react';
import { connect } from 'react-redux';
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

const WalletsCard = ({ wallets }) => {
  const [allWallets] = useState(wallets);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Wallets" />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {allWallets.map((wallet, i) => (
            <WalletItem
              id={wallet.id}
              index={i}
              name={wallet.name}
              sum={wallet.sum}
              date={wallet.date}
              walletsLength={allWallets.length}
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

const mapStateToProps = (state) => {
  const { wallets } = state;
  return { wallets };
};

export default connect(mapStateToProps)(WalletsCard);
