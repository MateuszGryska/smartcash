import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ExpensesList from './components/ExpensesList';
import Toolbar from './components/Toolbar';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import ActiveModal from '../../components/ActiveModal/ActiveModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const ExpensesView = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar handleOpen={() => setModalVisibility(true)} />
        <div className={classes.content}>
          <ExpensesList />
        </div>
        <ActiveModal
          pageType="expenses"
          open={isModalVisible}
          handleClose={() => setModalVisibility(false)}
          type="edit"
        />
      </div>
    </UserTemplate>
  );
};

export default ExpensesView;
