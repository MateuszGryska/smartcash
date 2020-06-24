import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import SmallCard from './components/SmallCard/SmallCard';
import BilanceChart from './components/BilanceChart/BilanceChart';
import WalletsCard from './components/WalletsCard/WalletsCard';
import BilanceList from './components/BilanceList/BilanceList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const DashboardView = () => {
  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Budget" amount="24000" />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Income" amount="4600" />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Expense" amount="2434" />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SmallCard title="Total" amount="2330" />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BilanceChart />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <WalletsCard />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <BilanceList />
          </Grid>
        </Grid>
      </div>
    </UserTemplate>
  );
};

export default DashboardView;
