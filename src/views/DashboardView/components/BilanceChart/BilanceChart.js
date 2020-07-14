import React from 'react';
import { useChartData } from 'hooks/chart-data-hook';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { options } from 'views/DashboardView/components/BilanceChart/chart';
import palette from 'theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const BilanceChart = ({ budgetElements }) => {
  const classes = useStyles();
  const { readyIncomes, readyExpenses, labels } = useChartData(budgetElements);

  const data = {
    labels,
    datasets: [
      {
        label: 'expenses',
        backgroundColor: palette.error.main,
        data: readyExpenses,
      },
      {
        label: 'incomes',
        backgroundColor: palette.success.main,
        data: readyIncomes,
      },
    ],
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Button size="large" variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Incomes and expenses"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />

      <CardActions className={classes.actions}>
        <Button color="primary" size="large" variant="text" component={Link} to="/budgetlist">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default BilanceChart;
