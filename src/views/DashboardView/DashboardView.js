import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import SmallCard from './components/SmallCard/SmallCard';
import BilanceChart from './components/BilanceChart/BilanceChart';
import WalletsCard from './components/WalletsCard/WalletsCard';
import BilanceList from './components/BilanceList/BilanceList';

import { fetchDataByUserId as fetchDataByUserIdAction } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const DashboardView = ({ fetchDataByUserId, wallets, categories, budgetElements, isLoading }) => {
  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
    fetchDataByUserId('categories', 'categories');
    fetchDataByUserId('budgetElements', 'budgetElements');
  }, [fetchDataByUserId]);

  // get wallets sum total value
  const walletsAllSumValues = [];
  if (wallets && !isLoading) {
    wallets.forEach((wallet) => walletsAllSumValues.push(wallet.sum));
  }
  const walletsTotal = walletsAllSumValues.reduce((w, sum) => w + sum, 0);

  // get income and expense total value
  const incomeAllSumValues = [];
  const expenseAllSumValues = [];
  if (categories && !isLoading) {
    const filteredIncomes = categories.filter((item) => {
      return item.type === 'income';
    });
    filteredIncomes.forEach((income) => incomeAllSumValues.push(income.sum));
    const filteredExpenses = categories.filter((item) => {
      return item.type === 'expense';
    });
    filteredExpenses.forEach((expense) => expenseAllSumValues.push(expense.sum));
  }

  const income = incomeAllSumValues.reduce((incomeTotal, sum) => incomeTotal + sum, 0);
  const expense = expenseAllSumValues.reduce((expenseTotal, sum) => expenseTotal + sum, 0);

  const total = income - expense;

  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Budget" amount={walletsTotal} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Income" amount={income} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Expense" amount={expense} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Total" amount={total} isLoading={isLoading} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BilanceChart />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <WalletsCard wallets={wallets} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <BilanceList
              budgetElements={budgetElements}
              wallets={wallets}
              categories={categories}
            />
          </Grid>
        </Grid>
      </div>
    </UserTemplate>
  );
};

const mapStateToProps = (state) => {
  const { wallets, categories, budgetElements, isLoading } = state.items;
  return { wallets, categories, budgetElements, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
