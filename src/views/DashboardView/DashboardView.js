import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import SmallCard from './components/SmartCard.js/SmallCard';
import BilanceChart from './components/BilanceChart/BilanceChart';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const DashboardView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing="4">
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SmallCard title="Budget" amount="$24000" />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SmallCard title="Income" amount="$4600" />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SmallCard title="Outcome" amount="$2434" />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SmallCard title="Total" amount="$2330" />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <BilanceChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardView;
