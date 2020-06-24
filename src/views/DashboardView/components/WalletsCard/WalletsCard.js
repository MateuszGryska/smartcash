import React, { useEffect } from 'react';
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
  Typography,
  LinearProgress,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import WalletItem from './WalletItem';

import { fetchDataByUserId as fetchDataByUserIdAction } from '../../../../actions';

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

const WalletsCard = ({ wallets, fetchDataByUserId }) => {
  useEffect(() => {
    fetchDataByUserId();
  }, [fetchDataByUserId]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Wallets" />
      <Divider />
      {!wallets ? (
        <LinearProgress />
      ) : (
        <CardContent className={classes.content}>
          <List>
            {wallets.length > 0 ? (
              wallets.map((wallet, i) => (
                <WalletItem
                  id={wallet.id}
                  index={i}
                  name={wallet.name}
                  sum={wallet.sum}
                  date={wallet.date}
                  walletsLength={wallets.length}
                />
              ))
            ) : (
              <Typography align="center" variant="h3">
                You dont have any wallets, add new one!
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

const mapStateToProps = (state) => {
  const { wallets } = state;
  return { wallets };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: () => dispatch(fetchDataByUserIdAction('wallets', 'wallets')),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsCard);
