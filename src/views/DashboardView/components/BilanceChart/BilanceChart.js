import React, { useState } from 'react';
import { useChartData } from 'hooks/chart-data-hook';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';

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
  const [days, setDay] = useState(6);
  const { readyIncomes, readyExpenses, labels } = useChartData(budgetElements, days);

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

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Select
            labelId="demo-simple-select-outlined-label"
            id="days"
            name="days"
            onChange={handleChange}
            value={days}
            variant="outlined"
          >
            <MenuItem value={6}>Last 7 days</MenuItem>
            <MenuItem value={13}>Last 14 days</MenuItem>
            <MenuItem value={29}>Last 30 days</MenuItem>
          </Select>
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
