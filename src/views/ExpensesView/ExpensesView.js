import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ExpensesList from './components/ExpensesList';
import Toolbar from './components/Toolbar';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const ExpensesView = () => {
  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar />
        <div className={classes.content}>
          <ExpensesList />
        </div>
      </div>
    </UserTemplate>
  );
};

export default ExpensesView;
