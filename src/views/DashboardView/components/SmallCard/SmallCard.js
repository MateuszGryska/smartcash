import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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
    backgroundColor: theme.palette.success.dark,
    height: 56,
    width: 56,
  },
  avatarExpense: {
    backgroundColor: theme.palette.error.dark,
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
  negativeDifferenceIcon: {
    color: theme.palette.error.dark,
  },
  positiveDifferenceIcon: {
    color: theme.palette.success.dark,
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
    marginRight: '5px',
  },
  caption: {
    marginLeft: '5px',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const SmallCard = React.memo(
  ({ title, amount, lastMonth, isLoading }) => {
    const classes = useStyles();

    let currentIcon;
    if (title === 'Budget') {
      currentIcon = (
        <Avatar className={classes.avatar}>
          <MoneyIcon className={classes.icon} />
        </Avatar>
      );
    } else if (title === 'Incomes' || title === 'Expenses') {
      currentIcon = (
        <Avatar
          className={clsx(title === 'Incomes' ? classes.avatarIncome : classes.avatarExpense)}
        >
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

    let renderComparison;
    if (lastMonth > 0) {
      renderComparison = (
        <>
          <ArrowDropUpIcon
            className={title === 'Total' ? classes.total : classes.positiveDifferenceIcon}
          />
          <Typography
            className={title === 'Total' ? classes.total : classes.positiveDifferenceIcon}
            variant="body2"
          >
            {lastMonth}%
          </Typography>
          <Typography
            className={clsx(title === 'Total' ? classes.total : classes.caption)}
            variant="caption"
          >
            Since last month
          </Typography>
        </>
      );
    } else if (lastMonth < 0) {
      renderComparison = (
        <>
          <ArrowDropDownIcon
            className={title === 'Total' ? classes.total : classes.negativeDifferenceIcon}
          />
          <Typography
            className={title === 'Total' ? classes.total : classes.negativeDifferenceIcon}
            variant="body2"
          >
            {lastMonth}%
          </Typography>
          <Typography
            className={clsx(title === 'Total' ? classes.total : classes.caption)}
            variant="caption"
          >
            Since last month
          </Typography>
        </>
      );
    } else {
      renderComparison = (
        <>
          <Typography className={title === 'Total' ? classes.total : null} variant="body2">
            {lastMonth}%
          </Typography>
          <Typography
            className={clsx(title === 'Total' ? classes.total : classes.caption)}
            variant="caption"
          >
            Since last month
          </Typography>
        </>
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
              {amount || !isLoading ? (
                <Typography
                  variant={title === 'Budget' ? 'h1' : 'h3'}
                  className={clsx(title === 'Total' ? classes.total : null)}
                >
                  ${amount}
                </Typography>
              ) : (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              )}
            </Grid>
            <Grid item>{currentIcon}</Grid>
          </Grid>
          <div className={classes.difference}>{title !== 'Budget' ? renderComparison : null}</div>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.amount === nextProps.amount;
  },
);

SmallCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  lastMonth: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

SmallCard.defaultProps = {
  lastMonth: '0.0',
};

export default SmallCard;
