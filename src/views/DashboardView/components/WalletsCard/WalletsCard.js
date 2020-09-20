import React from 'react';
import PropTypes from 'prop-types';
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
import WalletItem from 'views/DashboardView/components/WalletsCard/WalletItem';

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

const WalletsCard = React.memo(
  ({ wallets, isLoading }) => {
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
  },

  (prevProps, nextProps) => {
    return prevProps.wallets === nextProps.wallets;
  },
);

WalletsCard.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
};

WalletsCard.defaultProps = {
  wallets: [],
};

export default WalletsCard;
