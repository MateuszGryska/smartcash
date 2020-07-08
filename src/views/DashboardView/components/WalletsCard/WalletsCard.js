import React from 'react';
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
  Typography,
  LinearProgress,
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

const WalletsCard = ({ wallets, isLoading }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Wallets" />
      <Divider />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <CardContent className={classes.content}>
          <List>
            {wallets.length > 0 ? (
              wallets.map((wallet, i) => (
                <WalletItem
                  key={wallet.id}
                  id={wallet.id}
                  index={i}
                  name={wallet.name}
                  sum={wallet.sum}
                  date={wallet.date}
                  walletsLength={wallets.length}
                  budgetElements={wallet.budgetElements}
                />
              ))
            ) : (
              <Typography align="center" variant="h3">
                You don&#39;t have any wallets, add new one!
              </Typography>
            )}
          </List>
        </CardContent>
      )}

      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="large" variant="text" component={Link} to="/wallets">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default WalletsCard;
