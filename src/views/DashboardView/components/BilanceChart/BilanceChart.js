import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';

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

const BilanceChart = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Button size="large" variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Incomes and outcomes"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />

      <CardActions className={classes.actions}>
        <Button color="primary" size="large" variant="text" component={Link} to="/expenses">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default BilanceChart;
