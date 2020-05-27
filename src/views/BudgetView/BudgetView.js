import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import MoneyCard from './components/MoneyCard';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const BudgetView = () => {
  const classes = useStyles();
  const [bilanceItems] = useState(mockData);

  const incomes = bilanceItems.filter((item) => {
    return item.categoryType === 'income';
  });
  const outcomes = bilanceItems.filter((item) => {
    return item.categoryType === 'outcome';
  });
  console.log(incomes, outcomes);

  return (
    <div className={classes.root}>
      <Toolbar />
      <div>
        <Grid container spacing="4" className={classes.gridContainer}>
          {incomes.map(({ id, categoryName, categoryType, sumAll, updatedAt }) => (
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <MoneyCard
                categoryName={categoryName}
                key={id}
                categoryType={categoryType}
                sumAll={sumAll}
                updatedAt={updatedAt}
              />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Grid container spacing="4" className={classes.gridContainer}>
          {outcomes.map(({ id, categoryName, categoryType, sumAll, updatedAt }) => (
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <MoneyCard
                categoryName={categoryName}
                key={id}
                categoryType={categoryType}
                sumAll={sumAll}
                updatedAt={updatedAt}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default BudgetView;
