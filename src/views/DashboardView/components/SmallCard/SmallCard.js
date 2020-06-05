import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  rootTotal: {
    height: '100%',
    background: theme.palette.primary.dark,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.warning.main,
    height: 56,
    width: 56,
  },
  avatarIncome: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  avatarExpense: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  avatarTotal: {
    backgroundColor: 'transparent',
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  totalDifferenceValue: {
    color: theme.palette.white,
    marginRight: theme.spacing(1),
  },
  totalTitle: {
    color: theme.palette.white,
    fontWeight: 700,
  },
  total: {
    color: theme.palette.white,
  },
}));

const SmallCard = ({ title, amount }) => {
  const classes = useStyles();

  let currentIcon;
  if (title === 'Budget') {
    currentIcon = (
      <Avatar className={classes.avatar}>
        <MoneyIcon className={classes.icon} />
      </Avatar>
    );
  } else if (title === 'Income' || title === 'Expense') {
    currentIcon = (
      <Avatar className={clsx(title === 'Income' ? classes.avatarIncome : classes.avatarExpense)}>
        <ShowChartIcon className={classes.icon} />
      </Avatar>
    );
  } else {
    currentIcon = (
      <Avatar className={classes.avatarTotal}>
        <AttachMoneyIcon className={classes.icon} />
      </Avatar>
    );
  }

  return (
    <Card className={clsx(title === 'Total' ? classes.rootTotal : classes.root)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={clsx(title === 'Total' ? classes.totalTitle : classes.title)}>
              {title}
            </Typography>
            <Typography variant="h3" className={clsx(title === 'Total' ? classes.total : null)}>
              {amount}
            </Typography>
          </Grid>
          <Grid item>{currentIcon}</Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDropDownIcon
            className={clsx(title === 'Total' ? classes.total : classes.differenceIcon)}
          />
          <Typography
            className={clsx(
              title === 'Total' ? classes.totalDifferenceValue : classes.differenceValue,
            )}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            className={clsx(title === 'Total' ? classes.total : classes.caption)}
            variant="caption"
          >
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmallCard;
