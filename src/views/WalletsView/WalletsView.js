import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import MoneyCard from './components/MoneyCard';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const WalletsView = () => {
  const classes = useStyles();

  const [wallets] = useState(mockData);
  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        <Grid container spacing="4">
          {wallets.map(({ id, accountName, moneyValue, updatedAt }) => (
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <MoneyCard
                accountName={accountName}
                key={id}
                moneyValue={moneyValue}
                updatedAt={updatedAt}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default WalletsView;
