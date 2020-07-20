import React, { useEffect } from 'react';
import { useComparisonData } from 'hooks/get-comparison-hook';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import UserTemplate from 'templates/UserTemplate/UserTemplate';
import { BilanceList, WalletsCard, BilanceChart, SmallCard } from 'views/DashboardView/components';

import {
  fetchDataByUserId as fetchDataByUserIdAction,
  getUserById as getUserByIdAction,
} from 'actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const DashboardView = ({
  getUserById,
  fetchDataByUserId,
  wallets,
  categories,
  budgetElements,
  isLoading,
  userId,
}) => {
  useEffect(() => {
    fetchDataByUserId('categories', 'categories');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId('budgetElements', 'budgetElements');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userId) {
      getUserById();
    }
    // eslint-disable-next-line
  }, []);

  const {
    walletsTotal,
    income,
    expense,
    lastMonthIncome,
    lastMonthExpense,
    total,
    lastMonthTotal,
  } = useComparisonData(budgetElements, categories, wallets, isLoading);

  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Budget" amount={walletsTotal} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard
              title="Incomes"
              amount={income}
              lastMonth={lastMonthIncome.toFixed(1)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard
              title="Expenses"
              amount={expense}
              lastMonth={lastMonthExpense.toFixed(1)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard
              title="Total"
              amount={total}
              lastMonth={lastMonthTotal.toFixed(1)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BilanceChart budgetElements={budgetElements} />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <WalletsCard wallets={wallets} isLoading={isLoading} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {isLoading ? (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            ) : (
              <BilanceList
                budgetElements={budgetElements}
                wallets={wallets}
                categories={categories}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </UserTemplate>
  );
};

DashboardView.propTypes = {
  budgetElements: PropTypes.arrayOf(PropTypes.object),
  wallets: PropTypes.arrayOf(PropTypes.object),
};

DashboardView.defaultProps = {
  budgetElements: [],
  wallets: [],
};

const mapStateToProps = (state) => {
  const { wallets, categories, budgetElements, isLoading } = state.items;
  const { userId } = state.auth;
  return { wallets, categories, userId, budgetElements, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
  getUserById: () => dispatch(getUserByIdAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
